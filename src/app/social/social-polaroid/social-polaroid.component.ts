import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Person} from "@app/social/person.model";
import moment from "moment";
import {Contact} from "@app/social/contact.model";
import {SocialService} from "@app/social/social.service";

@Component({
    selector: 'app-social-polaroid',
    templateUrl: './social-polaroid.component.html',
    styleUrls: ['./social-polaroid.component.scss']
})
export class SocialPolaroidComponent {

    @Input()
    person: Person;

    @Input()
    old: boolean;

    @Output()
    onSave = new EventEmitter<Contact>();

    flipped = false;
    rotateLeft: boolean;
    rotateRight: boolean;

    constructor(private _socialService: SocialService) {
        if (Math.random() < 0.5) {
            this.rotateLeft = true;
        } else {
            this.rotateRight = true;
        }
    }

    // TODO copied over from social-person-settings. Make this global?
    getLastContactInDaysAgo = (person: Person) => {
        if (person && person.lastContact) {
            return moment().startOf("day").diff(moment(person.lastContact).startOf("day"), "days") + " days ago";
        } else {
            return "unknown";
        }
    };

    flip() {
        this.flipped = true;
    }

    cancel() {
        this.flipped = false;
    }

    save($event) {
        this.flipped = false;
        this.onSave.emit($event);
    }

    getImageUrl() {
        let thumbnail = this.old ? this.person.sepiaThumbnail : this.person.colorThumbnail;
        return this._socialService.getImageUrl(thumbnail);
    }
}
