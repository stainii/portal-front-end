import {Component} from '@angular/core';
import {UserService} from "../user.service";
import {Router} from "@angular/router";
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-logout',
    templateUrl: './logout.component.html',
    styleUrls: ['./logout.component.scss'],
    imports: [MatIcon]
})
export class LogoutComponent {

    constructor(private _userService: UserService, private _router: Router) {
    }

    logOut() {
        this._userService.logOut();
        this._router.navigate(["login"]);
    }

}
