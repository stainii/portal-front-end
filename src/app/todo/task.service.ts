import {Injectable} from '@angular/core';
import {Task} from "@app/todo/task.model";
import {environment} from "@env/environment";
import {TaskTemplateEntry} from "@app/todo/task-template-entry.model";
import * as moment from "moment";
import {TaskRepository} from "@app/todo/task.repository";
import {TaskStatus} from "@app/todo/task-status.model";
import {TaskPatchService} from "@app/todo/task-patch.service";
import {Guid} from "guid-typescript";
import {TaskPatch} from "@app/todo/task-patch.model";

@Injectable({
    providedIn: 'root'
})
export class TaskService {

    constructor(private _taskRepository: TaskRepository,
                private _taskPatchService: TaskPatchService) {
    }

    watchTasks() {
        return this._taskRepository.watchTasks();
    }

    refreshTasks() {
        return this._taskRepository.refreshTasks();
    }

    create(task: Task) {
        if (!task.context) {
            task.context = environment.defaultTaskContext;
        }
        task.id = Guid.raw();
        task.creationDateTime = moment().toDate();

        return this._taskRepository.create(task);
    }

    createTasksBasedOn(taskTemplateEntry: TaskTemplateEntry) {
        return this._taskRepository.createTasksBasedOn(taskTemplateEntry);
    }

    complete(task: Task) {
        let updatedTask = Object.create(task);
        updatedTask.status = TaskStatus.COMPLETED;
        let patch = this._taskPatchService.createPatch(updatedTask, task);

        return this._taskRepository.patch(task, patch);
    }

    update(updatedTask: Task, originalTask: Task) {
        if (!updatedTask.context) {
            updatedTask.context = environment.defaultTaskContext;
        }

        let patch = this._taskPatchService.createPatch(updatedTask, originalTask);
        updatedTask.patch(patch);

        return this._taskRepository.patch(originalTask, patch);
    }

    undo(taskPatch: TaskPatch) {
        return this._taskRepository.undo(taskPatch);
    }

}
