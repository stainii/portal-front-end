import {TaskTemplate} from "@app/todo/task-template.model";

export class TaskTemplateEntry {
    public taskTemplate: TaskTemplate;
    public variables: any;
    public dueDateTimeOfMainTask: string;
    public startDateTimeOfMainTask: string;

    constructor() {
        this.variables = {};
    }
}
