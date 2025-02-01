import {Component, OnDestroy, OnInit} from '@angular/core';
import {NotificationSubscriptionService} from "../notification-subscription.service";
import {NotificationSubscription} from "../notification-subscription.model";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import { NotificationSubscriptionListComponent } from '../notification-subscription-list/notification-subscription-list.component';
import { NotificationSubscriptionDetailsComponent } from '../notification-subscription-details/notification-subscription-details.component';

@Component({
    selector: 'app-notification-subscription-editor',
    templateUrl: './notification-subscription-editor.component.html',
    styleUrls: ['./notification-subscription-editor.component.scss'],
    imports: [NotificationSubscriptionListComponent, NotificationSubscriptionDetailsComponent]
})
export class NotificationSubscriptionEditorComponent implements OnInit, OnDestroy {

    subscriptions: NotificationSubscription[];
    currentlyEditing: NotificationSubscription;
    private destroy$ = new Subject<void>();

    constructor(private _subscriptionService: NotificationSubscriptionService) {
    }

    ngOnInit() {
        this._subscriptionService.findAll()
            .pipe(takeUntil(this.destroy$))
            .subscribe(subscriptions => {
                if (subscriptions && subscriptions.length > 0) {
                    this.subscriptions = subscriptions;
                } else {
                    this.subscriptions = [];
                }
            })
    }

    ngOnDestroy(): void {
        this.destroy$.next();
    }

    selectSubscription(subscription: NotificationSubscription) {
        this.currentlyEditing = subscription;
    }

    save(subscription: NotificationSubscription) {
        if (subscription.id) {
            this._subscriptionService.update(subscription)
                .pipe(takeUntil(this.destroy$))
                .subscribe();
        } else {
            this._subscriptionService.create(subscription)
                .pipe(takeUntil(this.destroy$))
                .subscribe(persistedSubscription => {
                    subscription.id = persistedSubscription.id;
                });
        }
    }

}
