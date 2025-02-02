import {Component, input, output} from '@angular/core';
import {Person} from "@app/social/person.model";

import { SocialPersonSettingsComponent } from '../social-person-settings/social-person-settings.component';

@Component({
    selector: 'app-social-manage-people-list',
    templateUrl: './social-manage-people-list.component.html',
    styleUrls: ['./social-manage-people-list.component.scss'],
    imports: [SocialPersonSettingsComponent]
})
export class SocialManagePeopleListComponent {

    readonly people = input<Person[]>(undefined);

    readonly onClick = output<any>();

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
