import {Component, OnInit} from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-housagotchi-menu-bar-for-creature',
    templateUrl: './housagotchi-menu-bar-for-creature.component.html',
    styleUrls: ['./housagotchi-menu-bar-for-creature.component.scss'],
    imports: [RouterLink, MatIcon]
})
export class HousagotchiMenuBarForCreatureComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
