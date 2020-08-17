import {Component} from '@angular/core';
import {Person} from "@app/social/person.model";
import {SocialPersonSettingsEditComponent} from "@app/social/social-person-settings-edit/social-person-settings-edit.component";
import {MatDialog} from "@angular/material/dialog";
import {SocialService} from "@app/social/social.service";

@Component({
    selector: 'app-social-manage-people',
    templateUrl: './social-manage-people.component.html',
    styleUrls: ['./social-manage-people.component.scss']
})
export class SocialManagePeopleComponent {

    people: Person[];

    constructor(private _dialog: MatDialog, private _socialService: SocialService) {
        this._findAllPeople();
    }

    edit($event) {
        this._showDialog($event.person, $event.$clickEvent);
    }

    create() {
        this._showDialog({
            id: null,
            colorThumbnail: null,
            sepiaThumbnail: null,
            lastContact: null,
            maxNumberOfDaysBetweenContacts: null,
            minNumberOfDaysBetweenContacts: null,
            name: null,
            newImageContent: null,
            latestUpdates: null,
            shouldContact: null
        }, null);
    }

    private _showDialog(person: Person, $event) {
        const dialogRef = this._dialog.open(SocialPersonSettingsEditComponent, {
            width: '350px',
            data: {person: person, $event: $event}
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result.type == "SAVE") {
                this._save(result.person);
            } else if (result.type == "DELETE") {
                this._delete(result.person);
            } else {
                console.log("Doing nothing with " + result.type);
            }
        });
    }

    private _save(person: Person) {
        if (person.id) {
            this._socialService.update(person)
                .subscribe(this._findAllPeople);
        } else {
            this._socialService.create(person)
                .subscribe(this._findAllPeople);
        }
    }

    private _delete(person: Person) {
        this._socialService.delete(person)
            .subscribe(this._findAllPeople);
    }

    private _findAllPeople = () => {
        this._socialService
            .findAll()
            .subscribe(people => this.people = people);
    }

}
