import { Component, HostListener, OnDestroy, OnInit, inject } from '@angular/core';
import {UserService} from "@app/user/user.service";
import { Router, RouterOutlet } from "@angular/router";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import { NgProgressModule } from 'ngx-progressbar';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ErrorNotificationComponent } from './error/error-notification/error-notification.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [
        NgProgressModule,
        DashboardComponent,
        RouterOutlet,
        ErrorNotificationComponent,
    ],
})
export class AppComponent implements OnInit, OnDestroy {
    private _userService = inject(UserService);
    private _router = inject(Router);


    private destroy$ = new Subject<void>();

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

    @HostListener('document:visibilitychange', ['$event'])
    checkIfLoginTokenHasNotExpired() {
        console.info("The page lost focus and regained it, checking if user token is still valid.");
        this._userService.logOutWhenTokenHasExpired();
    }

}
