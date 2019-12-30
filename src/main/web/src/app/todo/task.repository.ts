import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Task} from "@app/todo/task.model";
import {environment} from "@env/environment";
import {LocalStorageService} from "ngx-webstorage";
import {HttpClient} from "@angular/common/http";
import {TaskTemplateEntry} from "@app/todo/task-template-entry.model";
import {catchError, map, tap} from "rxjs/operators";
import {UserService} from "@app/user/user.service";
import {TaskPatch} from "@app/todo/task-patch.model";
import * as moment from "moment";
import {TaskStatus} from "@app/todo/task-status.model";
import {TaskPatchService} from "@app/todo/task-patch.service";
import {ErrorService} from "@app/error/error.service";

/**
 * This repository is the single source of truth regarding the current state of tasks and their patches.
 * No business logic is found here, that belongs in the service.
 * This repository can be used to retrieve, update and rollback the latest state of tasks and patches.
 **/
@Injectable({
    providedIn: 'root'
})
export class TaskRepository {

    private _taskWatcher: BehaviorSubject<Task[]>;
    private _taskTail: EventSource;

    constructor(private _storage: LocalStorageService,
                private _http: HttpClient,
                private _userService: UserService,
                private _taskPatchService: TaskPatchService,
                private _errorService: ErrorService) {
        this._taskWatcher = new BehaviorSubject([]);
        this._setup();
    }

    watchTasks() {
        return this._taskWatcher.asObservable();
    }

    refreshTasks() {
        this._clearLocalStorage();
        if (this._taskTail) {
            this._taskTail.close();
        }
        return this._setup();
    }

    create(task: Task) {
        // first, create task in local storage
        let patch = this._taskPatchService.createPatch(task, new Task());
        task.patch(patch);
        this._upsertTaskInLocalStorage(task);
        this._publishTasksOfLocalStorage();

        // then, create task on server
        return this._http.post<Task>(environment.apiBaseUrl + "todo/task/", task)
            .pipe(catchError(error => {
                // if we get an error that is not handled by the offline interceptor, revert changes in local history
                this._removeTaskFromLocalStorage(task);
                this._publishTasksOfLocalStorage();
                throw error;
            }));
    }

    createTasksBasedOn(taskTemplateEntry: TaskTemplateEntry) {
        return this._http.post<Task[]>(environment.apiBaseUrl + "todo/task/from-template/", taskTemplateEntry);
    }

    findPatchesSince(date: Date) {
        console.info("Looking for patches to tasks since " + date);
        return this._http.get<TaskPatch[]>(environment.apiBaseUrl + "todo/task/patch/?since=" + date.toISOString());
    }

    patch(task: Task, patch: TaskPatch) {
        // first, patch in local storage
        task.patch(patch);
        this._upsertTaskInLocalStorage(task);
        this._publishTasksOfLocalStorage();

        // then, send patch to server
        return this._http.patch<Task>(environment.apiBaseUrl + "todo/task/" + task.id, patch)
            .pipe(catchError(error => {
                // if we get an error that is not handled by the offline interceptor, revert changes in local history
                task.rollback(patch);
                this._upsertTaskInLocalStorage(task);
                this._publishTasksOfLocalStorage();
                throw error;
            }));
    }

    private _setup() {
        this._retrieveUpToDateTasks()
            .subscribe(tasks => {
                    this._storeTasksInLocalStorage(tasks);
                    this._publishTasksOfLocalStorage();
                    this._watchChangesToTasks();
                },
                error => {
                    this._errorService.notify(error);
                    this._publishTasksOfLocalStorage()
                });
    }

    private _retrieveUpToDateTasks(): Observable<Task[]> {
        let tasksInLocalStorage = this._findTasksFromLocalStorage();
        let dateOfLastUpdate = this._getDateOfLastUpdate();

        if (tasksInLocalStorage && tasksInLocalStorage.length > 0) {
            console.log("There are tasks saved from a previous session in local storage. I'll bring these up to date.");

            return this.findPatchesSince(dateOfLastUpdate || moment("2019-01-01T00:00:00").toDate())
                .pipe(
                    tap(patches => {
                        patches.forEach(patch => {
                            let task = this._findTaskOrNew(patch.taskId);
                            task.patch(patch);
                            this._upsertTaskInLocalStorage(task);
                        })
                    }),
                    map(patches => this._findTasksFromLocalStorage()) // don't return the changed tasks, return all tasks!)
                );
        } else {
            console.log("No tasks found from a previous session in local storage. Fetching fresh list of tasks from server.");
            return this._findTasksFromServer();
        }
    }

    private _watchChangesToTasks() {
        this._taskTail = new EventSource(
            environment.apiBaseUrl + "todo/task/patch/?tail&jwt=" + this._userService.getLoggedInUser().token.value);

        this._taskTail.addEventListener('message', (event: MessageEvent) => {
            console.info("New task patches were sent by the server.");

            let patches = JSON.parse(event.data);
            if (!Array.isArray(patches)) {
                patches = [patches]; // there is only one patch, so let's put in an array
            }

            (patches as Array<TaskPatch>).forEach(patch => {
                let task = this._findTaskOrNew(patch.taskId);
                task.patch(patch);
                this._upsertTaskInLocalStorage(task);
            });
            this._publishTasksOfLocalStorage();
        });

        console.info("Watching changes to tasks (sent by server).");

        //when the connection is lost, retry after 10 seconds
        this._taskTail.onerror = error => {
            console.error("Connection lost while watching changes to tasks. Retrying in 10 seconds", error);
            this._taskTail.close();
            setTimeout(() => {
                this._setup();
            }, 1000);
        };
    }

    private _setDateOfLastUpdate(date: Date) {
        this._storage.store("dateOfLastUpdate", date);
    }

    private _getDateOfLastUpdate(): Date {
        let dateAsString = this._storage.retrieve("dateOfLastUpdate");
        if (dateAsString) {
            return new Date(dateAsString);
        } else {
            return null;
        }
    }

    private _findTasksFromServer() {
        return this._http.get<Task[]>(environment.apiBaseUrl + "todo/task/")
            .pipe(
                map(tasks => tasks.map(
                    task => Object.assign(new Task(), task)))
            );
    }

    private _findTasksFromLocalStorage() {
        let tasks = this._storage.retrieve("tasks");
        if (tasks == null) {
            return [];
        } else {
            return tasks
                .map(task => Object.assign(new Task(), task));
        }
    }

    private _findTaskOrNew(id: string) {
        let tasks = this._findTasksFromLocalStorage();

        let index = tasks.findIndex(task => task.id == id);
        if (index == -1) {
            return new Task();
        } else {
            return tasks[index];
        }
    }

    private _upsertTaskInLocalStorage(updatedOrNewTask: Task) {
        let tasks = this._findTasksFromLocalStorage();

        let index = tasks.findIndex(task => task.id == updatedOrNewTask.id);
        if (index == -1) {
            tasks.push(updatedOrNewTask);
        } else {
            tasks[index] = updatedOrNewTask;
        }

        tasks = tasks.filter(task => task.status != TaskStatus.COMPLETED);

        this._storeTasksInLocalStorage(tasks);
    }

    private _storeTasksInLocalStorage(tasks: Task[]) {
        this._storage.store("tasks", tasks);
        this._setDateOfLastUpdate(new Date());
    }

    private _clearLocalStorage() {
        this._storage.clear("tasks");
        this._storage.clear("dateOfLastUpdate");
    }

    private _publishTasksOfLocalStorage() {
        this._taskWatcher.next(this._findTasksFromLocalStorage());
    }

    private _removeTaskFromLocalStorage(task: Task) {
        this._storeTasksInLocalStorage(
            this._findTasksFromLocalStorage().filter(t => t.id != task.id)
        );
    }
}