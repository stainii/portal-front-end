import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NotificationSubscription} from "../notification-subscription.model";

@Component({
    selector: 'app-notification-subscription-details',
    templateUrl: './notification-subscription-details.component.html',
    styleUrls: ['./notification-subscription-details.component.scss'],
    standalone: false
})
export class NotificationSubscriptionDetailsComponent {

    @Input()
    subscription: NotificationSubscription;

    @Output()
    onSave: EventEmitter<NotificationSubscription> = new EventEmitter<NotificationSubscription>();

    constructor() {
    }

    save() {
        this.onSave.emit(this.subscription);
    }
}
