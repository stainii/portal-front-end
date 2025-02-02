import {Component, OnDestroy} from '@angular/core';
import {fromEvent, Subject} from "rxjs";
import {mapTo, takeUntil} from "rxjs/operators";

import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-offline-indicator',
    templateUrl: './offline-indicator.component.html',
    styleUrls: ['./offline-indicator.component.scss'],
    imports: [MatIcon]
})
export class OfflineIndicatorComponent implements OnDestroy {

    isOffline: boolean;
    private destroy$ = new Subject<void>();

    constructor() {
        fromEvent(window, 'offline')
            .pipe(
                takeUntil(this.destroy$),
                mapTo(true)
            )
            .subscribe(isOffline => this.isOffline = isOffline);

        fromEvent(window, 'online')
            .pipe(
                takeUntil(this.destroy$),
                mapTo(true)
            ).subscribe(isOnline => this.isOffline = !isOnline);
    }

    ngOnDestroy(): void {
        this.destroy$.next();
    }

}
