import { Component, OnDestroy, inject } from '@angular/core';
import {UserService} from "@app/user/user.service";
import {Router} from "@angular/router";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {environment} from "@env/environment";
import { FormsModule } from '@angular/forms';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatCardActions } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    imports: [FormsModule, MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatFormField, MatLabel, MatInput, MatCardActions, MatButton]
})
export class LoginComponent implements OnDestroy {
    private _userService = inject(UserService);
    private _router = inject(Router);


    username: string;
    password: string;
    error: string;
    hasError: boolean;

    private destroy$ = new Subject<void>();

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
                () => this._router.navigate([environment.defaultModule]),
                error => {
                    this.hasError = true;
                    this.error = error.message
                });
    }

}

