import { Component, EventEmitter, OnDestroy, Output, inject, input } from '@angular/core';
import {Notification} from "../notification.model";
import {DateService} from "@app/util/date.service";
import {NotificationService} from "../notification.service";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

import { MatCardSubtitle, MatCard, MatCardTitle, MatCardContent, MatCardActions } from '@angular/material/card';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss'],
    imports: [MatCardSubtitle, MatCard, MatCardTitle, MatCardContent, MatCardActions, MatButton]
})
export class NotificationComponent implements OnDestroy {
    private dateService = inject(DateService);
    private _notificationService = inject(NotificationService);


    readonly notification = input<Notification>(undefined);

    read: boolean = false;

    @Output()
    onRead: EventEmitter<Notification> = new EventEmitter<Notification>();

    private destroy$ = new Subject<void>();

    ngOnDestroy(): void {
        this.destroy$.next();
    }

    calculateTimeSinceNotificationPoppedUp(notification: Notification) {
        return this.dateService.calculateDifference(this.dateService.now(), notification.date);
    }

    markAsRead(id: number, $event: Event) {
        $event.stopPropagation();
        this._notificationService.markAsRead(id)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                this.read = true;
                this.onRead.emit(this.notification());
            });
    }

    executeAction(notification: Notification) {
        window.location.href = notification.action.url;
    }
}
