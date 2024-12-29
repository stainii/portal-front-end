import {RecurringTask} from "@app/recurring-tasks/recurring-task.model";
import {Status} from "@app/health/state.model";

export class Report {
    public status: string;

    constructor(public lateTasks: RecurringTask[]) {
        this.status = this.calculateStatus(lateTasks);
    }

    private calculateStatus(lateTasks: RecurringTask[]) {
        if (lateTasks.length > 0) {
            return Status.FAT;
        } else {
            return Status.BODYBUILDER;
        }
    }

}
