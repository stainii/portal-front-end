import {Task} from "./task.model";
import {TaskPatch} from "@app/todo/task-patch.model";

export class TaskPatchResult {

    public task: Task;
    public taskPatch: TaskPatch;

}
