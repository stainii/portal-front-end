import {Component, Input, OnInit} from '@angular/core';
import {Activity} from "@app/activity/activity.model";
import {ActivityHelperService} from "@app/activity/activity-helper.service";

@Component({
    selector: 'app-activity-search-result',
    templateUrl: './activity-search-result.component.html',
    styleUrls: ['./activity-search-result.component.scss']
})
export class ActivitySearchResultComponent implements OnInit {

    @Input()
    activity: Activity;

    constructor(private activityHelper: ActivityHelperService) {
    }

    ngOnInit(): void {
    }

    formattedLocation() {
        if (this.activity && this.activity.location) {
            let parts = [this.activity.location.city, this.activity.location.province, this.activity.location.country];
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
