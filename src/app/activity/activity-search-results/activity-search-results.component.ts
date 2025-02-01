import {Component, Input, OnInit} from '@angular/core';
import {Activity} from "@app/activity/activity.model";
import { NgFor } from '@angular/common';
import { ActivitySearchResultComponent } from '../activity-search-result/activity-search-result.component';

@Component({
    selector: 'app-activity-search-results',
    templateUrl: './activity-search-results.component.html',
    styleUrls: ['./activity-search-results.component.scss'],
    imports: [NgFor, ActivitySearchResultComponent]
})
export class ActivitySearchResultsComponent implements OnInit {

    @Input()
    activities: Activity[];

    constructor() {
    }

    ngOnInit(): void {
    }

}
