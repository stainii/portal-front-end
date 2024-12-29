import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "@app/user/user.service";
import {Router} from "@angular/router";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {

    private destroy$ = new Subject<void>();

    constructor(private _userService: UserService, private _router: Router) {
    }

    ngOnInit(): void {
        this._userService.watchLoginStatus()
            .pipe(takeUntil(this.destroy$))
            .subscribe(isLoggedIn => {
                if (!isLoggedIn) {
                    this._router.navigate(["login"]);
                }
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
    }

    @HostListener('document:visibilitychange', [ '$event' ])
    checkIfLoginTokenHasNotExpired($event) {
        console.info("The page lost focus and regained it, checking if user token is still valid.");
        this._userService.logOutWhenTokenHasExpired();
    }

}
