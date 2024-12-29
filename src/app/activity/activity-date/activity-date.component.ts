import {Component, OnInit} from '@angular/core';
import {SearchActivitiesService} from "@app/activity/search-activities.service";
import {Moment} from "moment";

@Component({
    selector: 'app-activity-date',
    templateUrl: './activity-date.component.html',
    styleUrls: ['./activity-date.component.scss']
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
