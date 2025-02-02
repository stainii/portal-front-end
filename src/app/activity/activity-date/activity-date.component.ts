import {Component, OnInit} from '@angular/core';
import {SearchActivitiesService} from "@app/activity/search-activities.service";
import {Moment} from "moment";
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatDatepickerInput, MatDatepickerToggle, MatDatepicker } from '@angular/material/datepicker';

import { MatSlideToggle } from '@angular/material/slide-toggle';

@Component({
    selector: 'app-activity-date',
    templateUrl: './activity-date.component.html',
    styleUrls: ['./activity-date.component.scss'],
    imports: [MatCard, MatCardHeader, MatCardTitle, MatCardContent, FormsModule, MatFormField, MatInput, MatDatepickerInput, MatDatepickerToggle, MatSuffix, MatDatepicker, MatSlideToggle]
})
export class ActivityDateComponent implements OnInit {
    startDate: Moment;
    endDate: Moment;
    range = false;

    constructor(private searchActivitiesService: SearchActivitiesService) {
    }

    ngOnInit(): void {
    }


    onDateChange() {
        this.searchActivitiesService.updateDates(this.startDate, this.calculateEndDate());
    }

    onRangeToggled() {
        if (!this.range) {
            this.searchActivitiesService.updateDates(this.startDate, this.calculateEndDate());
        }
    }

    private calculateEndDate() {
        return this.range && this.endDate ? this.endDate : this.startDate;
    }
}
