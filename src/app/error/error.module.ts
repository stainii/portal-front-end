import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ErrorNotificationComponent} from './error-notification/error-notification.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";


@NgModule({
    imports: [
        CommonModule,
        MatSnackBarModule,
        ErrorNotificationComponent
    ], exports: [
        ErrorNotificationComponent,
    ]
})
export class ErrorModule {
}
