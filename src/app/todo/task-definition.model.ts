import {Importance} from "@app/todo/importance.model";

export class TaskDefinition {
    public name: string;
    public startDateDeviationDays: number;
    public startDateDeviationBase: string;
    public dueDateDeviationDays: number;
    public dueDateDeviationBase: string;
    public expectedDurationInHours: number;
    public context: string;
    public importance: Importance;
    public description: string;

}
