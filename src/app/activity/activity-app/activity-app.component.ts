import {Component, OnInit} from '@angular/core';
import {SearchActivitiesService} from "@app/activity/search-activities.service";
import {Observable} from "rxjs";
import {Activity} from "@app/activity/activity.model";

@Component({
    selector: 'app-activity-app',
    templateUrl: './activity-app.component.html',
    styleUrls: ['./activity-app.component.scss']
})
export class ActivityAppComponent implements OnInit {

    activities$: Observable<Activity[]>;

    constructor(private searchActivitiesService: SearchActivitiesService) {
    }

    ngOnInit(): void {
        this.activities$ = this.searchActivitiesService.subscribeToSearchResults();
    }

}
