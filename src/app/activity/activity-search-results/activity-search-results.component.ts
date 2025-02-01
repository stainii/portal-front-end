import {Component, Input, OnInit} from '@angular/core';
import {Activity} from "@app/activity/activity.model";

@Component({
    selector: 'app-activity-search-results',
    templateUrl: './activity-search-results.component.html',
    styleUrls: ['./activity-search-results.component.scss'],
    standalone: false
})
export class ActivitySearchResultsComponent implements OnInit {

    @Input()
    activities: Activity[];

    constructor() {
    }

    ngOnInit(): void {
    }

}
