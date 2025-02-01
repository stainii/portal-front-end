import {Component, OnInit} from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-social-menu-bar-for-overview',
    templateUrl: './social-menu-bar-for-overview.component.html',
    styleUrls: ['./social-menu-bar-for-overview.component.scss'],
    imports: [RouterLink, MatIcon]
})
export class SocialMenuBarForOverviewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
