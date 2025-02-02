import {Component} from '@angular/core';
import {MatListItem, MatNavList} from '@angular/material/list';
import { LowerCasePipe } from '@angular/common';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
    imports: [MatNavList, MatListItem, RouterLinkActive, RouterLink, LowerCasePipe]
})
export class MenuComponent {
    modules = ['todo', 'housagotchi', 'setlist', 'social', 'health', 'activity', 'notifications'];
}
