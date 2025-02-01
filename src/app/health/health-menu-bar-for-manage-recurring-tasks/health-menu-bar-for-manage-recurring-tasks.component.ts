import {Component, OnInit} from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-health-menu-bar-for-manage-recurring-tasks',
    templateUrl: './health-menu-bar-for-manage-recurring-tasks.component.html',
    styleUrls: ['./health-menu-bar-for-manage-recurring-tasks.component.scss'],
    imports: [RouterLink, MatIcon]
})
export class HealthMenuBarForManageRecurringTasksComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
