import { Component, OnInit, inject, input } from '@angular/core';
import {Activity} from "@app/activity/activity.model";
import {ActivityHelperService} from "@app/activity/activity-helper.service";
import { MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent, MatCardFooter } from '@angular/material/card';


@Component({
    selector: 'app-activity-search-result',
    templateUrl: './activity-search-result.component.html',
    styleUrls: ['./activity-search-result.component.scss'],
    imports: [MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent, MatCardFooter]
})
export class ActivitySearchResultComponent implements OnInit {
    private activityHelper = inject(ActivityHelperService);


    readonly activity = input<Activity>(undefined);

    ngOnInit(): void {
    }

    formattedLocation() {
        const activity = this.activity();
        if (activity && activity.location) {
            let parts = [activity.location.city, activity.location.province, activity.location.country];
            let formattedLocation = "";
            for(let part of parts) {
                if (part) {
                    if (formattedLocation != "") {
                        formattedLocation += ", ";
                    }
                    formattedLocation += part;
                }
            }
            return formattedLocation;
        }
        return "";
    }


    getPhotoUrl(photo: string) {
        if (!photo) {
            return "assets/activity/no-photo.png";
        }
        return this.activityHelper.getPhotoUrl(photo);
    }

}
