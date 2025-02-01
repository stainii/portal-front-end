import {Component, OnInit} from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-housagotchi-menu-bar-for-manage-recurring-tasks',
    templateUrl: './housagotchi-menu-bar-for-manage-recurring-tasks.component.html',
    styleUrls: ['./housagotchi-menu-bar-for-manage-recurring-tasks.component.scss'],
    imports: [RouterLink, MatIcon]
})
export class HousagotchiMenuBarForManageRecurringTasksComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
