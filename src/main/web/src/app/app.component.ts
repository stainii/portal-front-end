import {Component, HostListener, OnInit} from '@angular/core';
import {UserService} from "@app/user/user.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

    constructor(private _userService: UserService, private _router: Router) {
    }

    ngOnInit(): void {
        this._userService.watchLoginStatus()
            .subscribe(isLoggedIn => {
                if (!isLoggedIn) {
                    this._router.navigate(["login"]);
                }
            });
    }

    @HostListener('document:visibilitychange', [ '$event' ])
    checkIfLoginTokenHasNotExpired($event) {
        console.info("The page lost focus and regained it, checking if user token is still valid.");
        this._userService.logOutWhenTokenHasExpired();
    }

}
