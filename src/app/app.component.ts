import {Component} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {NgProgressModule} from 'ngx-progressbar';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ErrorNotificationComponent} from './error/error-notification/error-notification.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    NgProgressModule,
    DashboardComponent,
    RouterOutlet,
    ErrorNotificationComponent,
  ],
})
export class AppComponent {
}
