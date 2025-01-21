import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ErrorNotificationComponent} from './error-notification/error-notification.component';
import {MatLegacySnackBarModule as MatSnackBarModule} from "@angular/material/legacy-snack-bar";


@NgModule({
    declarations: [ErrorNotificationComponent],
    imports: [
        CommonModule,
        MatSnackBarModule
    ], exports: [
        ErrorNotificationComponent
    ]
})
export class ErrorModule {
}
