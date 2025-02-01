import {Component, OnInit} from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-activity-menu-bar-for-manage',
    templateUrl: './activity-menu-bar-for-manage.component.html',
    styleUrls: ['./activity-menu-bar-for-manage.component.scss'],
    imports: [RouterLink, MatIcon]
})
export class ActivityMenuBarForManageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
