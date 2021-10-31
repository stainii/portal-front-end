import {Component, OnDestroy} from '@angular/core';
import {UserService} from "@app/user/user.service";
import {Router} from "@angular/router";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy {

    username: string;
    password: string;
    error: string;
    hasError: boolean;

    private destroy$ = new Subject<void>();

    constructor(private _userService: UserService, private _router: Router) {

    }

    ngOnDestroy(): void {
        this.destroy$.next();
    }

    logIn($event: Event) {
        $event.preventDefault();
        this.hasError = false;
        this.error = null;
        this._userService.logIn(this.username, this.password)
            .pipe(takeUntil(this.destroy$))
            .subscribe(
                () => this._router.navigate(["/notifications"]),
                error => {
                    this.hasError = true;
                    this.error = error.message
                });
    }

}

