import {Component, OnDestroy} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable, Subject} from 'rxjs';
import {map, takeUntil} from 'rxjs/operators';
import {UserService} from "@app/user/user.service";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
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
