import {Component, OnDestroy} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable, Subject} from 'rxjs';
import {map, takeUntil} from 'rxjs/operators';
import {UserService} from "@app/user/user.service";
import { MatSidenavContainer, MatSidenav, MatSidenavContent } from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import { NgIf, AsyncPipe } from '@angular/common';
import { MenuComponent } from '../menu/menu.component';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { OfflineIndicatorComponent } from '../offline/offline-indicator/offline-indicator.component';
import { RouterOutlet } from '@angular/router';
import { LogoutComponent } from '../user/logout/logout.component';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    imports: [MatSidenavContainer, MatSidenav, MatToolbar, NgIf, MenuComponent, MatSidenavContent, MatIconButton, MatIcon, OfflineIndicatorComponent, RouterOutlet, LogoutComponent, AsyncPipe]
})
export class DashboardComponent implements OnDestroy {

    shouldShowNavigation = false;

    isHandset$: Observable<boolean> = this._breakpointObserver.observe(Breakpoints.Handset)
        .pipe(map(result => result.matches));

    private destroy$ = new Subject<void>();

    constructor(private _breakpointObserver: BreakpointObserver, private _userService: UserService) {
        this._userService.watchLoginStatus()
            .pipe(takeUntil(this.destroy$))
            .subscribe(isLoggedIn => this.shouldShowNavigation = isLoggedIn.valueOf());
    }

    ngOnDestroy(): void {
        this.destroy$.next();
    }

}
