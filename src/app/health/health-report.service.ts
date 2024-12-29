import {Injectable} from '@angular/core';
import {Report} from "@app/health/report.model";
import {RecurringTask} from "@app/recurring-tasks/recurring-task.model";
import * as moment from "moment";

@Injectable({
    providedIn: 'root'
})
export class HealthReportService {

    constructor() {
    }

    assemble(recurringTasks: RecurringTask[]): Report {
        let lateTasks = [];
        const now = moment().startOf("day");

        recurringTasks.forEach(recurringTask => {
            if (!recurringTask.lastExecution) {
                return;
            }

            if (moment(recurringTask.lastExecution)
                .add(recurringTask.minNumberOfDaysBetweenExecutions, "days")
                .subtract(1, "days") // x rest days = x + 1 min days between executions
                .isBefore(now)) {

                lateTasks.push(recurringTask);
            }
        });

        return new Report(lateTasks);
    }


}
