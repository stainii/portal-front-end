import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TodoSubscription} from "@app/todo/todo-subscription.model";
import { NgClass } from '@angular/common';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-todo-subscription-list',
    templateUrl: './todo-subscription-list.component.html',
    styleUrls: ['./todo-subscription-list.component.scss'],
    imports: [NgClass, MatButton]
})
export class TodoSubscriptionListComponent {

    @Input()
    set subscriptions(subscriptions: TodoSubscription[]) {
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
    subscriptionSelected: EventEmitter<TodoSubscription> = new EventEmitter<TodoSubscription>();

    selectedSubscription: TodoSubscription;
    private _subscriptions: TodoSubscription[];

    selectSubscription(subscription: TodoSubscription) {
        this.selectedSubscription = subscription;
        this.subscriptionSelected.emit(subscription);
    }

    createNewSubscription() {
        let newSubscription = new TodoSubscription();
        this.subscriptions.push(newSubscription);
        this.selectedSubscription = newSubscription;
        this.subscriptionSelected.emit(newSubscription);
    }

}
