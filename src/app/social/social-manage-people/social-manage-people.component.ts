import { Component, OnDestroy, inject } from '@angular/core';
import {Person} from "@app/social/person.model";
import {
    SocialPersonSettingsEditComponent
} from "@app/social/social-person-settings-edit/social-person-settings-edit.component";
import {MatDialog} from "@angular/material/dialog";
import {SocialService} from "@app/social/social.service";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import { SocialManagePeopleListComponent } from '../social-manage-people-list/social-manage-people-list.component';
import { MatFabButton } from '@angular/material/button';

@Component({
    selector: 'app-social-manage-people',
    templateUrl: './social-manage-people.component.html',
    styleUrls: ['./social-manage-people.component.scss'],
    imports: [SocialManagePeopleListComponent, MatFabButton]
})
export class SocialManagePeopleComponent implements OnDestroy {
    private _dialog = inject(MatDialog);
    private _socialService = inject(SocialService);


    people: Person[];
    private destroy$ = new Subject<void>();

    constructor() {
        this._findAllPeople();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
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
            width: '360px',
            data: {person: person, $event: $event}
        });

        dialogRef.afterClosed()
            .pipe(takeUntil(this.destroy$))
            .subscribe(result => {
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
                .pipe(takeUntil(this.destroy$))
                .subscribe(this._findAllPeople);
        } else {
            this._socialService.create(person)
                .pipe(takeUntil(this.destroy$))
                .subscribe(this._findAllPeople);
        }
    }

    private _delete(person: Person) {
        this._socialService.delete(person)
            .pipe(takeUntil(this.destroy$))
            .subscribe(this._findAllPeople);
    }

    private _findAllPeople = () => {
        this._socialService
            .findAll()
            .pipe(takeUntil(this.destroy$))
            .subscribe(people => this.people = people);
    }

}
