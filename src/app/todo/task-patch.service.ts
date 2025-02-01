import {Injectable} from '@angular/core';
import {Task} from "@app/todo/task.model";
import moment from "moment";
import {Guid} from "guid-typescript";

@Injectable({
    providedIn: 'root'
})
export class TaskPatchService {

    constructor() {
    }

    createPatch(updatedTask: Task, originalTask: Task) {
        let patch = {
            id: Guid.raw(),
            taskId: originalTask.id,
            dateTime: moment().toDate(),
            changes: {}
        };
        Object.keys(updatedTask)
            .forEach(key => {
                if (key != "history" && updatedTask[key] != originalTask[key]) {
                    patch.changes[key] = updatedTask[key]
                }
            });
        return patch;
    }

}
