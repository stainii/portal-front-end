import {Component, OnInit} from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-health-menu-bar-for-sporty-spice',
    templateUrl: './health-menu-bar-for-sporty-spice.component.html',
    styleUrls: ['./health-menu-bar-for-sporty-spice.component.scss'],
    imports: [RouterLink, MatIcon]
})
export class HealthMenuBarForSportySpiceComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
