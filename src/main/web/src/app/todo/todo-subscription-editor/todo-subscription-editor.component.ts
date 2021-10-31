import {Component, OnDestroy, OnInit} from '@angular/core';
import {TodoSubscriptionService} from "@app/todo/todo-subscription.service";
import {TodoSubscription} from "@app/todo/todo-subscription.model";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";

@Component({
    selector: 'app-todo-subscription-editor',
    templateUrl: './todo-subscription-editor.component.html',
    styleUrls: ['./todo-subscription-editor.component.scss']
})
export class TodoSubscriptionEditorComponent implements OnInit, OnDestroy {

    subscriptions: TodoSubscription[];
    currentlyEditing: TodoSubscription;
    private destroy$ = new Subject<void>();

    constructor(private _subscriptionService: TodoSubscriptionService) {
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

    selectSubscription(subscription: TodoSubscription) {
        this.currentlyEditing = subscription;
    }

    save(subscription: TodoSubscription) {
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
