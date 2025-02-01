import {Component, OnInit} from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-notification-menu-bar-for-list',
    templateUrl: './notification-menu-bar-for-list.component.html',
    styleUrls: ['./notification-menu-bar-for-list.component.scss'],
    imports: [RouterLink, MatIcon]
})
export class NotificationMenuBarForListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
