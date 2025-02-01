import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Person} from "@app/social/person.model";
import { NgFor } from '@angular/common';
import { SocialPersonSettingsComponent } from '../social-person-settings/social-person-settings.component';

@Component({
    selector: 'app-social-manage-people-list',
    templateUrl: './social-manage-people-list.component.html',
    styleUrls: ['./social-manage-people-list.component.scss'],
    imports: [NgFor, SocialPersonSettingsComponent]
})
export class SocialManagePeopleListComponent {

    @Input()
    people: Person[];

    @Output()
    onClick = new EventEmitter<any>()

    constructor() {
    }

    ngOnInit(): void {
    }

    clicked(person: Person, $event: MouseEvent) {
        this.onClick.emit({
            person: person,
            $clickEvent: $event
        });
    }
}
