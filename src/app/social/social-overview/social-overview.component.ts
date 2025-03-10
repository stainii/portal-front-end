import { Component, OnDestroy, inject } from '@angular/core';
import {Person} from "@app/social/person.model";
import {SocialService} from "@app/social/social.service";
import moment from "moment";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";

import { SocialPolaroidComponent } from '../social-polaroid/social-polaroid.component';

@Component({
    selector: 'app-social-overview',
    templateUrl: './social-overview.component.html',
    styleUrls: ['./social-overview.component.scss'],
    imports: [SocialPolaroidComponent]
})
export class SocialOverviewComponent implements OnDestroy {
    private _socialService = inject(SocialService);


    people: Person[];
    private destroy$ = new Subject<void>();

    constructor() {
        this._findAllPeople();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
    }

    save($event) {
        this._socialService
            .addContact($event.contact, $event.person)
            .pipe(takeUntil(this.destroy$))
            .subscribe(person => {
                $event.person.lastContact = person.lastContact;
                $event.person.latestUpdates = person.latestUpdates;
                $event.person.shouldContact = this.shouldContact(person);
            });
    }

    private _findAllPeople = () => {
        this._socialService
            .findAll()
            .pipe(takeUntil(this.destroy$))
            .subscribe(people => {
                this.people = people.sort((p1, p2) => (p1.minNumberOfDaysBetweenContacts - this.getDaysSinceLastContact(p1)) - (p2.minNumberOfDaysBetweenContacts - this.getDaysSinceLastContact(p2)));
                this.people.forEach(person => person.shouldContact = this.shouldContact(person))
            });
    }

    private getDaysSinceLastContact(person: Person) {
        return moment().startOf("day").diff(moment(person.lastContact).startOf("day"), "days");
    }

    private shouldContact(person: Person) {
        return moment().startOf("day").diff(moment(person.lastContact), "days") > person.minNumberOfDaysBetweenContacts
    }

}
