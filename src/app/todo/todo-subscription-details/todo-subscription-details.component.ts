import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TodoSubscription} from "@app/todo/todo-subscription.model";
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatHint } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-todo-subscription-details',
    templateUrl: './todo-subscription-details.component.html',
    styleUrls: ['./todo-subscription-details.component.scss'],
    imports: [NgIf, FormsModule, MatFormField, MatInput, MatHint, MatSelect, MatOption, MatButton]
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
