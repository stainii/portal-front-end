import {Component, OnDestroy, OnInit} from '@angular/core';
import {ErrorService} from "@app/error/error.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
    selector: 'app-error-notification',
    templateUrl: './error-notification.component.html',
    styleUrls: ['./error-notification.component.scss']
})
export class ErrorNotificationComponent implements OnInit, OnDestroy {

    private destroy$ = new Subject<void>();

    constructor(private _errorService: ErrorService,
                private _snackBar: MatSnackBar) {
    }

    ngOnInit() {
        this._errorService.errors$
            .pipe(takeUntil(this.destroy$))
            .subscribe(error => {
                this._snackBar.open(error.message, ":-{", {
                    duration: 2000,
                });
                console.error(error);
            });

    }

    ngOnDestroy(): void {
        this.destroy$.next();
    }

}
