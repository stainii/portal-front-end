import {Injectable} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs";
import {Activity} from "@app/activity/activity.model";
import {Page} from "@app/activity/page.model";
import {SearchActivitiesService} from "@app/activity/search-activities.service";
import {tap} from "rxjs/operators";
import {ActivityHelperService} from "@app/activity/activity-helper.service";

@Injectable({
    providedIn: 'root'
})
export class ManageActivitiesService {

    constructor(private _http: HttpClient, private _search: SearchActivitiesService, private _activityHelper: ActivityHelperService) {
    }

    public find(sortField: string, order: string, page: number, pageSize: number, filter: string): Observable<Page<Activity>> {
        let searchParams = this.calculateSearchParams(sortField, order, page, pageSize, filter);
        let searchParamsAsString = this._activityHelper.searchParamsToString(searchParams);
        return this._http.get<Page<Activity>>(`/api/activity/activities/${searchParamsAsString}`);
    }

    public findById(id: string) {
        return this._http.get<Activity>(`/api/activity/activities/${id}`);
    }

    public create(activity: Activity) {
        return this._http.post<Activity>(`/api/activity/activities/`, activity)
            .pipe(tap(() => this._search.refresh()));
    }

    public update(activity: Activity) {
        return this._http.put<Activity>(`/api/activity/activities/${activity.id}`, activity)
            .pipe(tap(() => this._search.refresh()));
    }

    public delete(activity: Activity) {
        return this._http.delete(`/api/activity/activities/${activity.id}`)
            .pipe(tap(() => this._search.refresh()));
    }

    private calculateSearchParams(sortField: string, order: string, page: number, pageSize: number, filter: string): string[] {
        let searchParams = [];

        if (sortField) {
            searchParams.push(`sortField=${sortField}`);
        }

        if (order) {
            searchParams.push(`order=${order}`);
        }

        if (page || page == 0) {
            searchParams.push(`page=${page}`);
        }

        if (pageSize) {
            searchParams.push(`pageSize=${pageSize}`);
        }

        if (filter) {
            searchParams.push(`filter=${filter}`);
        }

        return searchParams;
    }

}
