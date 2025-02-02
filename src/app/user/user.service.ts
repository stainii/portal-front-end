import { Injectable, inject } from '@angular/core';
import {User} from "./user.model";
import {TokenService} from "./token.service";
import {BehaviorSubject, Observable} from "rxjs";
import {map, tap} from "rxjs/operators";
import {LocalStorageService} from "@app/util/local-storage.service";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private _tokenService = inject(TokenService);
    private _storage = inject(LocalStorageService);

    private _user: User;
    private _logInStatusWatcher: BehaviorSubject<Boolean>;

    constructor() {
        this._user = User.copy(this._storage.retrieve('user')) || null;
        this._logInStatusWatcher = new BehaviorSubject(this.isLoggedIn());
    }

    isLoggedIn() {
        return !!this.getLoggedInUser();
    }

    getLoggedInUser() {
        return this._user;
    }

    watchLoginStatus() {
        return this._logInStatusWatcher.asObservable();
    }

    logIn(username: string, password: string): Observable<User> {
        return this._tokenService.logIn(username, password)
            .pipe(map(token => new User(username, token)))
            .pipe(tap(user => this._setLoggedInUser(user)));
    }

    logOut() {
        this._user = null;
        this._storage.remove("user");
        this._logInStatusWatcher.next(false);
    }

    logOutWhenTokenHasExpired() {
        if (this.isLoggedIn() &&
            this.getLoggedInUser().token.hasExpired()) {
            this.logOut();
        }
    }

    private _setLoggedInUser(user: User) {
        this._user = user;
        this._storage.store("user", user);
        this._logInStatusWatcher.next(true);
    }

}
