import {Component, OnInit, input, output} from '@angular/core';
import {Contact} from "@app/social/contact.model";
import {Person} from "@app/social/person.model";
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatDatepickerInput, MatDatepickerToggle, MatDatepicker } from '@angular/material/datepicker';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-social-add-contact',
    templateUrl: './social-add-contact.component.html',
    styleUrls: ['./social-add-contact.component.scss'],
    imports: [MatFormField, MatLabel, MatInput, FormsModule, MatDatepickerInput, MatDatepickerToggle, MatSuffix, MatDatepicker, MatButton]
})
export class SocialAddContactComponent implements OnInit {

    readonly onCancel = output<any>();

    readonly onSave = output<any>();

    readonly person = input<Person>(undefined);

    contact: Contact;

    constructor() {
    }

    ngOnInit(): void {
        this.contact = {
            latestUpdates: this.person().latestUpdates,
            lastContact: this.person().lastContact
        }
    }

    cancel() {
        this.onCancel.emit({});
    }

    save() {
        this.onSave.emit({
            contact: this.contact,
            person: this.person()
        });
    }

}
