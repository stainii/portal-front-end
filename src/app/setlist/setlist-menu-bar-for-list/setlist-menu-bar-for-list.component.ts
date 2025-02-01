import {Component, OnInit} from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-setlist-menu-bar-for-list',
    templateUrl: './setlist-menu-bar-for-list.component.html',
    styleUrls: ['./setlist-menu-bar-for-list.component.scss'],
    imports: [RouterLink, MatIcon]
})
export class SetlistMenuBarForListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
