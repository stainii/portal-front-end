import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import {TodoSubscriptionService} from "@app/todo/todo-subscription.service";
import {TodoSubscription} from "@app/todo/todo-subscription.model";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import { TodoSubscriptionListComponent } from '../todo-subscription-list/todo-subscription-list.component';
import { TodoSubscriptionDetailsComponent } from '../todo-subscription-details/todo-subscription-details.component';

@Component({
    selector: 'app-todo-subscription-editor',
    templateUrl: './todo-subscription-editor.component.html',
    styleUrls: ['./todo-subscription-editor.component.scss'],
    imports: [TodoSubscriptionListComponent, TodoSubscriptionDetailsComponent]
})
export class TodoSubscriptionEditorComponent implements OnInit, OnDestroy {
    private _subscriptionService = inject(TodoSubscriptionService);


    subscriptions: TodoSubscription[];
    currentlyEditing: TodoSubscription;
    private destroy$ = new Subject<void>();

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
