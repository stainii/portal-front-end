import {Component, OnInit} from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-todo-menu-bar-for-templates',
    templateUrl: './todo-menu-bar-for-templates.component.html',
    styleUrls: ['./todo-menu-bar-for-templates.component.scss'],
    imports: [RouterLink, MatIcon]
})
export class TodoMenuBarForTemplatesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
