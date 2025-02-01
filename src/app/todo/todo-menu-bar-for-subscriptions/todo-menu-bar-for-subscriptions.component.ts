import {Component, OnInit} from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-todo-menu-bar-for-subscriptions',
    templateUrl: './todo-menu-bar-for-subscriptions.component.html',
    styleUrls: ['./todo-menu-bar-for-subscriptions.component.scss'],
    imports: [RouterLink, MatIcon]
})
export class TodoMenuBarForSubscriptionsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
