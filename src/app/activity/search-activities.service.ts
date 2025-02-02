import { Injectable, inject } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {Moment} from "moment";
import {Activity} from "@app/activity/activity.model";
import {ActivityHelperService} from "@app/activity/activity-helper.service";

@Injectable({
    providedIn: 'root'
})
export class SearchActivitiesService {
    private _http = inject(HttpClient);
    private _activityHelper = inject(ActivityHelperService);


    private selectedLabels: string[] = [];
    private location: string;
    private startDate: Moment;
    private endDate: Moment;
    private considerWeather = true;

    private searchResults: BehaviorSubject<Activity[]> = new BehaviorSubject([]);

    constructor() {
        this.search();
    }

    subscribeToSearchResults(): Observable<Activity[]> {
        return this.searchResults.asObservable();
    }

    getSelectedLabels() {
        return this.selectedLabels;
    }

    toggleLabel(label: string) {
        const index = this.getSelectedLabels().indexOf(label);
        if (index != -1) {
            this.selectedLabels.splice(index, 1);
        } else {
            this.selectedLabels.push(label);
        }

        this.search();
    }

    updateLocation(location: string) {
        this.location = location;
        this.search();
    }

    getLocation() {
        return this.location;
    }

    updateDates(startDate: Moment, endDate: Moment) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.search();
    }

    getStartDate() {
        return this.startDate;
    }

    getEndDate() {
        return this.endDate;
    }

    refresh() {
        this.search();
    }

    private search() {
        let searchParams = this.calculateSearchParams();
        let searchParamsAsString = this._activityHelper.searchParamsToString(searchParams);

        return this._http.get<Activity[]>(`/api/activity/activities/search/${searchParamsAsString}`)
            .subscribe(results => this.searchResults.next(results));
    }

    private calculateSearchParams(): string[] {
        let searchParams = [];

        searchParams.push(`considerWeather=${this.considerWeather}`);

        if (this.selectedLabels.length > 0) {
            searchParams.push(`labels=${this.selectedLabels.toString()}`);
        }

        if (this.location && this.location != "") {
            searchParams.push(`location=${this.location}`);
        }

        if (this.startDate) {
            searchParams.push(`startDate=${this.startDate.format("YYYY-MM-DD")}`);
        }

        if (this.endDate) {
            searchParams.push(`endDate=${this.endDate.format("YYYY-MM-DD")}`);
        }

        return searchParams;
    }

}
