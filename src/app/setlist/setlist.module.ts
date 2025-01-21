import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SetlistRoutingModule} from './setlist-routing.module';
import {SetlistAppComponent} from './setlist-app/setlist-app.component';
import {SetlistMenuBarForListComponent} from './setlist-menu-bar-for-list/setlist-menu-bar-for-list.component';
import {MatIconModule} from "@angular/material/icon";
import {SetlistManageComponent} from './setlist-manage/setlist-manage.component';
import {SetlistSongDetailsComponent} from './setlist-song-details/setlist-song-details.component';
import {SetlistMenuBarForManageComponent} from './setlist-menu-bar-for-manage/setlist-menu-bar-for-manage.component';
import {MatLegacyTableModule as MatTableModule} from "@angular/material/legacy-table";
import {MatLegacyButtonModule as MatButtonModule} from "@angular/material/legacy-button";
import {MatLegacyDialogModule as MatDialogModule} from "@angular/material/legacy-dialog";
import {ReactiveFormsModule} from "@angular/forms";
import {MatLegacyInputModule as MatInputModule} from "@angular/material/legacy-input";
import {SetlistAddExecutionComponent} from './setlist-add-execution/setlist-add-execution.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatLegacySelectModule as MatSelectModule} from "@angular/material/legacy-select";
import {SetlistListComponent} from './setlist-list/setlist-list.component';
import {MatMomentDateModule} from "@angular/material-moment-adapter";


@NgModule({
    declarations: [SetlistAppComponent, SetlistMenuBarForListComponent, SetlistManageComponent, SetlistSongDetailsComponent, SetlistMenuBarForManageComponent, SetlistAddExecutionComponent, SetlistListComponent],
    imports: [
        CommonModule,
        SetlistRoutingModule,
        MatIconModule,
        MatTableModule,
        MatButtonModule,
        MatDialogModule,
        ReactiveFormsModule,
        MatInputModule,
        MatDatepickerModule,
        MatMomentDateModule,
        MatSelectModule
    ]
})
export class SetlistModule {
}
