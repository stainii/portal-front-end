import {Component, OnInit} from '@angular/core';
import {SearchActivitiesService} from "@app/activity/search-activities.service";
import {Observable} from "rxjs";
import {LabelService} from "@app/activity/label.service";
import { MatChipListbox, MatChipOption } from '@angular/material/chips';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-activity-labels',
    templateUrl: './activity-labels.component.html',
    styleUrls: ['./activity-labels.component.scss'],
    imports: [MatChipListbox, MatChipOption, AsyncPipe]
})
export class ActivityLabelsComponent implements OnInit {

    labels$: Observable<string[]>;

    constructor(private labelService: LabelService, private searchActivitiesService: SearchActivitiesService) {
    }

    ngOnInit(): void {
        this.labels$ = this.labelService.findAllLabels();
    }

    private getSelectedLabels() {
        return this.searchActivitiesService.getSelectedLabels();

    }
    isSelected(label: string) {
        return this.getSelectedLabels().indexOf(label) != -1;
    }

    onClick(label: string) {
        this.searchActivitiesService.toggleLabel(label);
    }
}
