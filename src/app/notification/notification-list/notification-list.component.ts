import { Component, OnDestroy, inject } from '@angular/core';
import {Notification} from "../notification.model";
import {NotificationService} from "../notification.service";
import {ErrorService} from "@app/error/error.service";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

import { NotificationComponent } from '../notification/notification.component';

@Component({
    selector: 'app-notification-list',
    templateUrl: './notification-list.component.html',
    styleUrls: ['./notification-list.component.scss'],
    imports: [NotificationComponent]
})
export class NotificationListComponent implements OnDestroy {
    private _notificationService = inject(NotificationService);
    private _errorService = inject(ErrorService);


    notifications: Notification[];
    private destroy$ = new Subject<void>();

    constructor() {
        this._notificationService.findActiveNotifications()
            .pipe(takeUntil(this.destroy$))
            .subscribe(
                notifications => this.notifications = notifications,
                error => this._errorService.notify(error)
            )
    }

    ngOnDestroy(): void {
        this.destroy$.next();
    }

    markAsRead(notification: Notification) {
        this.notifications = this.notifications.filter(obj => obj !== notification);
        console.log("Marked notification as read", notification);
    }

}
