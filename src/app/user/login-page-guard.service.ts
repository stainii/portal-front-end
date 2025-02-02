import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import {Observable} from "rxjs";
import {UserService} from "./user.service";
import {environment} from "@env/environment";

/**
 * Guard for the router.
 * Checks if the user is logged in, before letting him/her go to any page.
 */
@Injectable({
    providedIn: 'root'
})
export class LoginPageGuardService  {
    private _userService = inject(UserService);
    private _router = inject(Router);


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (this._userService.isLoggedIn()) {
            this._router.navigate([environment.defaultModule]);
            return false;
        } else {
            return true;
        }
    }
}
