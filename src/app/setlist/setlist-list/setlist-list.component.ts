import {Component, OnInit, input} from '@angular/core';
import {Setlist} from "@app/setlist/setlist.model";


@Component({
    selector: 'app-setlist-list',
    templateUrl: './setlist-list.component.html',
    styleUrls: ['./setlist-list.component.scss'],
    imports: []
})
export class SetlistListComponent implements OnInit {

    public readonly setlist = input<Setlist>(undefined);

    constructor() {
    }

    ngOnInit(): void {
    }

}
