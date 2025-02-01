import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DateInterval} from "@app/activity/date-interval.model";
import { MatCard } from '@angular/material/card';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-activity-manage-date-interval',
    templateUrl: './activity-manage-date-interval.component.html',
    styleUrls: ['./activity-manage-date-interval.component.scss'],
    imports: [MatCard, MatFormField, MatInput, FormsModule, MatCheckbox, MatIcon]
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
