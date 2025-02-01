import {Component, Input, OnInit} from '@angular/core';
import {Setlist} from "@app/setlist/setlist.model";

@Component({
    selector: 'app-setlist-list',
    templateUrl: './setlist-list.component.html',
    styleUrls: ['./setlist-list.component.scss'],
    standalone: false
})
export class SetlistListComponent implements OnInit {

    @Input()
    public setlist: Setlist;

    constructor() {
    }

    ngOnInit(): void {
    }

}
