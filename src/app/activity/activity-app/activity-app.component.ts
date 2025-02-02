import { Component, OnInit, inject } from '@angular/core';
import {SearchActivitiesService} from "@app/activity/search-activities.service";
import {Observable} from "rxjs";
import {Activity} from "@app/activity/activity.model";
import { ActivityLabelsComponent } from '../activity-labels/activity-labels.component';
import { ActivityLocationComponent } from '../activity-location/activity-location.component';
import { ActivityDateComponent } from '../activity-date/activity-date.component';
import { ActivitySearchResultsComponent } from '../activity-search-results/activity-search-results.component';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-activity-app',
    templateUrl: './activity-app.component.html',
    styleUrls: ['./activity-app.component.scss'],
    imports: [ActivityLabelsComponent, ActivityLocationComponent, ActivityDateComponent, ActivitySearchResultsComponent, AsyncPipe]
})
export class ActivityAppComponent implements OnInit {
    private searchActivitiesService = inject(SearchActivitiesService);


    activities$: Observable<Activity[]>;

    ngOnInit(): void {
        this.activities$ = this.searchActivitiesService.subscribeToSearchResults();
    }

}
