import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class LabelService {

    constructor(private _http: HttpClient) {
    }

    findAllLabels(): Observable<string[]> {
        return this._http.get<string[]>(`/api/activity/labels/`);
    }
}
