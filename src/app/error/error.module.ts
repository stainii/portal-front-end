import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ErrorNotificationComponent} from './error-notification/error-notification.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";


@NgModule({
    declarations: [ErrorNotificationComponent],
    imports: [
        CommonModule,
        MatSnackBarModule
    ], exports: [
        ErrorNotificationComponent,
    ]
})
export class ErrorModule {
}
