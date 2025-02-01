import {Injectable} from '@angular/core';
import {Report} from "@app/housagotchi/report.model";
import {RecurringTask} from "@app/recurring-tasks/recurring-task.model";
import {Mood} from "@app/housagotchi/mood.model";
import moment from "moment";

@Injectable({
    providedIn: 'root'
})
export class HousagotchiReportService {

    constructor() {
    }

    assemble(recurringTasks: RecurringTask[]): Report {
        let lateTasks = [];
        let veryLateTasks = [];
        const now = moment();

        recurringTasks.forEach(recurringTask => {
            if (!recurringTask.lastExecution) {
                return;
            }

            if (moment(recurringTask.lastExecution)
                .add(recurringTask.maxNumberOfDaysBetweenExecutions, "days")
                .isBefore(now)) {

                veryLateTasks.push(recurringTask);

            } else if (moment(recurringTask.lastExecution)
                .add(recurringTask.minNumberOfDaysBetweenExecutions, "days")
                .isBefore(now)) {

                lateTasks.push(recurringTask);
            }

        });

        let mood = this.calculateMood(lateTasks, veryLateTasks);
        return new Report(lateTasks, veryLateTasks, mood);
    }

    private calculateMood(lateTasks: RecurringTask[], veryLateTasks: RecurringTask[]) {
        if (veryLateTasks.length > 0) {
            return Mood.MAD;
        } else if (lateTasks.length > 0) {
            return Mood.ATTENTION;
        } else {
            return Mood.HAPPY;
        }
    }

}
