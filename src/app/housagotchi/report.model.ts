import {RecurringTask} from "@app/recurring-tasks/recurring-task.model";

export class Report {

    constructor(public lateTasks: RecurringTask[],
                public veryLateTasks: RecurringTask[],
                public mood: string) {
    }
}
