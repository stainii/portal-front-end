import {Injectable} from '@angular/core';
import {Setlist} from "@app/setlist/setlist.model";
import {Song} from "@app/setlist/song.model";
import {RecurringTask} from "@app/recurring-tasks/recurring-task.model";
import * as moment from "moment";

@Injectable({
    providedIn: 'root'
})
export class SetlistService {

    constructor() {
    }

    assemble(recurringTasks: RecurringTask[]): Setlist {
        const now = moment();

        return new Setlist(recurringTasks
            .sort((song1, song2) => {
                if (song1.minNumberOfDaysBetweenExecutions == song2.minNumberOfDaysBetweenExecutions) {
                    return song1.maxNumberOfDaysBetweenExecutions - song2.maxNumberOfDaysBetweenExecutions;
                } else {
                    return song1.minNumberOfDaysBetweenExecutions - song2.minNumberOfDaysBetweenExecutions;
                }
            }).map(recurringTask => {
                let overdue = !!recurringTask.lastExecution && moment(recurringTask.lastExecution)
                    .add(recurringTask.minNumberOfDaysBetweenExecutions, "days")
                    .isBefore(now);
                return new Song(recurringTask.id, recurringTask.name, overdue);
            }));
    }

}
