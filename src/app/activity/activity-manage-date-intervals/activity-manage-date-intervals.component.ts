import {Component, Input, OnInit} from '@angular/core';
import {DateInterval} from "@app/activity/date-interval.model";

@Component({
    selector: 'app-activity-manage-date-intervals',
    templateUrl: './activity-manage-date-intervals.component.html',
    styleUrls: ['./activity-manage-date-intervals.component.scss']
})
export class ActivityManageDateIntervalsComponent implements OnInit {

    @Input()
    dateIntervals: DateInterval[]

    constructor() {
    }

    ngOnInit(): void {

    }

    createNewDateInterval() {
        this.dateIntervals.push({
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
        let index = this.dateIntervals.indexOf(dateInterval);
        this.dateIntervals.splice(index, 1);
    }

}
