import {Component} from '@angular/core';
import {UserService} from "../user.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-logout',
    templateUrl: './logout.component.html',
    styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {

    constructor(private _userService: UserService, private _router: Router) {
    }

    logOut() {
        this._userService.logOut();
        this._router.navigate(["login"]);
    }

}
