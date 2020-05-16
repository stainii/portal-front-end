import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Person} from "@app/social/person.model";
import * as moment from "moment";
import {Contact} from "@app/social/contact.model";

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

    constructor() {
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
}
