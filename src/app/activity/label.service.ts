import { Injectable, inject } from '@angular/core';
import {Observable} from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class LabelService {
    private _http = inject(HttpClient);


    findAllLabels(): Observable<string[]> {
        return this._http.get<string[]>(`/api/activity/labels/`);
    }
}
