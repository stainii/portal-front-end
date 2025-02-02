import {Component, input, output} from '@angular/core';
import {NotificationSubscription} from "../notification-subscription.model";

import { FormsModule } from '@angular/forms';
import { MatFormField, MatLabel, MatHint } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-notification-subscription-details',
    templateUrl: './notification-subscription-details.component.html',
    styleUrls: ['./notification-subscription-details.component.scss'],
    imports: [FormsModule, MatFormField, MatLabel, MatInput, MatHint, MatSelect, MatOption, MatButton]
})
export class NotificationSubscriptionDetailsComponent {

    readonly subscription = input<NotificationSubscription>(undefined);

    readonly onSave = output<NotificationSubscription>();

    constructor() {
    }

    save() {
        this.onSave.emit(this.subscription());
    }
}
