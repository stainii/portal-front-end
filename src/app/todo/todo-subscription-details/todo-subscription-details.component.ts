import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TodoSubscription} from "@app/todo/todo-subscription.model";

@Component({
  selector: 'app-todo-subscription-details',
  templateUrl: './todo-subscription-details.component.html',
  styleUrls: ['./todo-subscription-details.component.scss']
})
export class TodoSubscriptionDetailsComponent {

    @Input()
    subscription: TodoSubscription;

    @Output()
    onSave: EventEmitter<TodoSubscription> = new EventEmitter<TodoSubscription>();

    constructor() {
    }

    save() {
        this.onSave.emit(this.subscription);
    }

}
