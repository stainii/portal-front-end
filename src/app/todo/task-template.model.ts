import {TaskDefinition} from "@app/todo/task-definition.model";

export class TaskTemplate {
    public id: string;
    public name: string;
    public taskDefinitions: TaskDefinition[];
    public variableNames: string[];
}
