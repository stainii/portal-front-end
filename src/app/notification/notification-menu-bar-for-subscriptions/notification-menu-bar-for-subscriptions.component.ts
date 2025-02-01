import {Component, OnInit} from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-notification-menu-bar-for-subscriptions',
    templateUrl: './notification-menu-bar-for-subscriptions.component.html',
    styleUrls: ['./notification-menu-bar-for-subscriptions.component.scss'],
    imports: [RouterLink, MatIcon]
})
export class NotificationMenuBarForSubscriptionsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
