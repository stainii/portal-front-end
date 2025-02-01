import {Component} from '@angular/core';
import { NotificationListComponent } from '../notification-list/notification-list.component';

@Component({
    selector: 'app-notification-app',
    templateUrl: './notification-app.component.html',
    styleUrls: ['./notification-app.component.scss'],
    imports: [NotificationListComponent]
})
export class NotificationAppComponent {

}
