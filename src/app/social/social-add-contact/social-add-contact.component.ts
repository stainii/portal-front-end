import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Contact} from "@app/social/contact.model";
import {Person} from "@app/social/person.model";

@Component({
    selector: 'app-social-add-contact',
    templateUrl: './social-add-contact.component.html',
    styleUrls: ['./social-add-contact.component.scss'],
    standalone: false
})
export class SocialAddContactComponent implements OnInit {

    @Output()
    onCancel = new EventEmitter<any>();

    @Output()
    onSave = new EventEmitter<any>();

    @Input()
    person: Person;

    contact: Contact;

    constructor() {
    }

    ngOnInit(): void {
        this.contact = {
            latestUpdates: this.person.latestUpdates,
            lastContact: this.person.lastContact
        }
    }

    cancel() {
        this.onCancel.emit();
    }

    save() {
        this.onSave.emit({
            contact: this.contact,
            person: this.person
        });
    }

}
