import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ErrorService {
    errors$: Subject<Error>;

    constructor() {
        this.errors$ = new Subject<Error>();
    }

    public notify(error: Error) {
        this.errors$.next(error);
    }
}
