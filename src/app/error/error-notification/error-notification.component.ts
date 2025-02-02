import { Component, OnDestroy, OnInit, inject } from '@angular/core';
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
    private _errorService = inject(ErrorService);
    private _snackBar = inject(MatSnackBar);


    private destroy$ = new Subject<void>();

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
