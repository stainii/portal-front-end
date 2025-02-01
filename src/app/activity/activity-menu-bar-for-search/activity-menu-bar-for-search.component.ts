import {Component, OnInit} from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-activity-menu-bar-for-search',
    templateUrl: './activity-menu-bar-for-search.component.html',
    styleUrls: ['./activity-menu-bar-for-search.component.scss'],
    imports: [RouterLink, MatIcon]
})
export class ActivityMenuBarForSearchComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
