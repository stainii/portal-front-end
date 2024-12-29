import {Component} from '@angular/core';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
    modules = ['todo', 'housagotchi', 'setlist', 'social', 'health', 'activity', 'notifications'];
}
