import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DateInterval} from "@app/activity/date-interval.model";

@Component({
    selector: 'app-activity-manage-date-interval',
    templateUrl: './activity-manage-date-interval.component.html',
    styleUrls: ['./activity-manage-date-interval.component.scss']
})
export class ActivityManageDateIntervalComponent implements OnInit {

    @Input()
    dateInterval: DateInterval;

    @Output()
    delete: EventEmitter<DateInterval> = new EventEmitter<DateInterval>();

    constructor() {
    }

    ngOnInit(): void {
    }

    deleteClicked() {
        this.delete.emit(this.dateInterval);
    }

}
