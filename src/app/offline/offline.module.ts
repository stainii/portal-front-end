import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OfflineIndicatorComponent} from './offline-indicator/offline-indicator.component';
import {MatIconModule} from "@angular/material/icon";


@NgModule({
    imports: [
        CommonModule,
        MatIconModule,
        OfflineIndicatorComponent
    ],
    exports: [
        OfflineIndicatorComponent
    ]
})
export class OfflineModule {
}
