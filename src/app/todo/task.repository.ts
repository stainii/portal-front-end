import {inject, Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Task} from "@app/todo/task.model";
import {HttpClient} from "@angular/common/http";
import {TaskTemplateEntry} from "@app/todo/task-template-entry.model";
import {catchError, map, tap} from "rxjs/operators";
import {TaskPatch} from "@app/todo/task-patch.model";
import moment from "moment";
import {TaskPatchService} from "@app/todo/task-patch.service";
import {ErrorService} from "@app/error/error.service";
import {TaskPatchResult} from "@app/todo/task-patch-result.model";
import {LocalStorageService} from "@app/util/local-storage.service";
import {UserService} from "@app/user/user.service";
import {SSE} from "sse.js";

/**
 * This repository is the single source of truth regarding the current state of tasks and their patches.
 * No business logic is found here, that belongs in the service.
 * This repository can be used to retrieve, update and rollback the latest state of tasks and patches.
 **/
@Injectable({
  providedIn: 'root'
})
export class TaskRepository {
  private _storage = inject(LocalStorageService);
  private _http = inject(HttpClient);
  private userService = inject(UserService);
  private _taskPatchService = inject(TaskPatchService);
  private _errorService = inject(ErrorService);


  private _taskWatcher: BehaviorSubject<Task[]>;
  private _taskTail: SSE;

  constructor() {
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
    return this._http.post<Task>("/api/todo/api/task/", task)
      .pipe(catchError(error => {
        // if we get an error that is not handled by the offline interceptor, revert changes in local history
        this._removeTaskFromLocalStorage(task);
        this._publishTasksOfLocalStorage();
        throw error;
      }));
  }

  createTasksBasedOn(taskTemplateEntry: TaskTemplateEntry) {
    return this._http.post<Task[]>("/api/todo/api/task/from-template/", taskTemplateEntry);
  }

  findPatchesSince(date: Date) {
    console.info("Looking for patches to tasks since " + date);
    return this._http.get<TaskPatch[]>("/api/todo/api/task/patch/?since=" + date.toISOString());
  }

  patch(task: Task, patch: TaskPatch) {
    // first, patch in local storage
    task.patch(patch);
    this._upsertTaskInLocalStorage(task);
    this._publishTasksOfLocalStorage();

    // then, send patch to server
    return this._http.patch<TaskPatchResult>("/api/todo/api/task/" + task.id, patch)
      .pipe(catchError(error => {
        // if we get an error that is not handled by the offline interceptor, revert changes in local history
        task.rollback(patch);
        this._upsertTaskInLocalStorage(task);
        this._publishTasksOfLocalStorage();
        throw error;
      }));
  }

  undo(taskPatch: TaskPatch) {
    return this._http.delete<TaskPatch>("/api/todo/api/task/patch/" + taskPatch.id);
  }

  private _setup() {
    this._publishTasksOfLocalStorage();
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
          map(_ => this._findTasksFromLocalStorage()) // don't return the changed tasks, return all tasks!)
        );
    } else {
      console.log("No tasks found from a previous session in local storage. Fetching fresh list of tasks from server.");
      return this._findTasksFromServer();
    }
  }

  private _watchChangesToTasks() {
    this._taskTail = new SSE("/api/todo/api/task/patch/?tail", { headers: { 'Authorization': 'Bearer ' + this.userService.token() } });

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

    //when the connection is lost, reconnect
    this._taskTail.onerror = error => {
      console.error("Connection lost while watching changes to tasks. Reconnecting.", error);
      this._taskTail.close();
      this._watchChangesToTasks();
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
    return this._http.get<Task[]>("/api/todo/api/task/")
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

    this._storeTasksInLocalStorage(tasks);
  }

  private _storeTasksInLocalStorage(tasks: Task[]) {
    this._storage.store("tasks", tasks);
    this._setDateOfLastUpdate(new Date());
  }

  private _clearLocalStorage() {
    this._storage.remove("tasks");
    this._storage.remove("dateOfLastUpdate");
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
