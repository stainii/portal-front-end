import {Component, OnInit} from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-social-menu-bar-for-manage-people',
    templateUrl: './social-menu-bar-for-manage-people.component.html',
    styleUrls: ['./social-menu-bar-for-manage-people.component.scss'],
    imports: [RouterLink, MatIcon]
})
export class SocialMenuBarForManagePeopleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
