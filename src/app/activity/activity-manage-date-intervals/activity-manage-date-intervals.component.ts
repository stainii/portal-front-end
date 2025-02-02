import {Component, OnInit, input} from '@angular/core';
import {DateInterval} from "@app/activity/date-interval.model";

import { ActivityManageDateIntervalComponent } from '../activity-manage-date-interval/activity-manage-date-interval.component';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-activity-manage-date-intervals',
    templateUrl: './activity-manage-date-intervals.component.html',
    styleUrls: ['./activity-manage-date-intervals.component.scss'],
    imports: [ActivityManageDateIntervalComponent, MatButton]
})
export class ActivityManageDateIntervalsComponent implements OnInit {

    readonly dateIntervals = input<DateInterval[]>(undefined);

    constructor() {
    }

    ngOnInit(): void {

    }

    createNewDateInterval() {
        this.dateIntervals().push({
            startDay: undefined,
            startMonth: undefined,
            startYear: undefined,
            endDay: undefined,
            endMonth: undefined,
            endYear: undefined,
            infiniteStart: false,
            infiniteEnd: false
        });
    }

    deleteDateInterval(dateInterval: DateInterval) {
        let index = this.dateIntervals().indexOf(dateInterval);
        this.dateIntervals().splice(index, 1);
    }

}
