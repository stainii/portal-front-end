import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {UserService} from "./user.service";

/**
 * Guard for the router.
 * Checks if the user is logged in, before letting him/her go to any page.
 */
@Injectable({
    providedIn: 'root'
})
export class AuthenticationGuardService implements CanActivate {

    constructor(private _userService: UserService, private _router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (this._userService.isLoggedIn()) {
            return true;
        } else {
            this._router.navigate(["login"]);
            return false;
        }
    }

}
