import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NotificationSubscription} from "../notification-subscription.model";

@Component({
    selector: 'app-notification-subscription-list',
    templateUrl: './notification-subscription-list.component.html',
    styleUrls: ['./notification-subscription-list.component.scss'],
    standalone: false
})
export class NotificationSubscriptionListComponent {

    @Input()
    set subscriptions(subscriptions: NotificationSubscription[]) {
        this._subscriptions = subscriptions;
        if (this.subscriptions && this.subscriptions.length > 0
            && !this.selectedSubscription) {
            this.selectSubscription(this.subscriptions[0]);
        }
    };
    get subscriptions() {
        return this._subscriptions;
    }

    @Output()
    subscriptionSelected: EventEmitter<NotificationSubscription> = new EventEmitter<NotificationSubscription>();

    selectedSubscription: NotificationSubscription;
    private _subscriptions: NotificationSubscription[];

    selectSubscription(subscription: NotificationSubscription) {
        this.selectedSubscription = subscription;
        this.subscriptionSelected.emit(subscription);
    }

    createNewSubscription() {
        let newSubscription = new NotificationSubscription();
        this.subscriptions.push(newSubscription);
        this.selectedSubscription = newSubscription;
        this.subscriptionSelected.emit(newSubscription);
    }

}
