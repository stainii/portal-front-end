import { Component, Input, inject } from '@angular/core';
import {Person} from "@app/social/person.model";
import moment from "moment";
import {SocialService} from "@app/social/social.service";
import { MatCard, MatCardAvatar, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent } from '@angular/material/card';

@Component({
    selector: 'app-social-person-settings',
    templateUrl: './social-person-settings.component.html',
    styleUrls: ['./social-person-settings.component.scss'],
    imports: [MatCard, MatCardAvatar, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent]
})
export class SocialPersonSettingsComponent {
    private _socialService = inject(SocialService);


    @Input()
    public person: Person;

    getLastContactInDaysAgo = () => {
        if (this.person && this.person.lastContact) {
            return moment().startOf("day").diff(moment(this.person.lastContact).startOf("day"), "days") + " days ago";
        } else {
            return "unknown";
        }
    };

    getImageUrl() {
        return this._socialService.getImageUrl(this.person.colorThumbnail);
    }
}
