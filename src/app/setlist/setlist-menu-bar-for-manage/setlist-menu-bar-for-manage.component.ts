import {Component, OnInit} from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-setlist-menu-bar-for-manage',
    templateUrl: './setlist-menu-bar-for-manage.component.html',
    styleUrls: ['./setlist-menu-bar-for-manage.component.scss'],
    imports: [RouterLink, MatIcon]
})
export class SetlistMenuBarForManageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
