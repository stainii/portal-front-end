import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ActivityRoutingModule} from './activity-routing.module';
import {ActivityAppComponent} from './activity-app/activity-app.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatChipsModule} from "@angular/material/chips";
import {MatLegacyButtonModule as MatButtonModule} from "@angular/material/legacy-button";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatLegacyCardModule as MatCardModule} from "@angular/material/legacy-card";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatLegacyInputModule as MatInputModule} from "@angular/material/legacy-input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatMomentDateModule} from "@angular/material-moment-adapter";
import {ActivityLabelsComponent} from './activity-labels/activity-labels.component';
import {ActivityLocationComponent} from './activity-location/activity-location.component';
import {ActivityDateComponent} from './activity-date/activity-date.component';
import {MatLegacySlideToggleModule as MatSlideToggleModule} from "@angular/material/legacy-slide-toggle";
import {ActivitySearchResultComponent} from './activity-search-result/activity-search-result.component';
import {ActivitySearchResultsComponent} from './activity-search-results/activity-search-results.component';
import {ActivityMenuBarForSearchComponent} from './activity-menu-bar-for-search/activity-menu-bar-for-search.component';
import {ActivityManageListComponent} from './activity-manage-list/activity-manage-list.component';
import {ActivityManageDetailsComponent} from './activity-manage-details/activity-manage-details.component';
import {ActivityMenuBarForManageComponent} from './activity-menu-bar-for-manage/activity-menu-bar-for-manage.component';
import {MatLegacyTableModule as MatTableModule} from "@angular/material/legacy-table";
import {MatLegacyPaginatorModule as MatPaginatorModule} from "@angular/material/legacy-paginator";
import {MatSortModule} from "@angular/material/sort";
import {ActivityConfirmDeleteComponent} from './activity-confirm-delete/activity-confirm-delete.component';
import {MatLegacyDialogModule as MatDialogModule} from "@angular/material/legacy-dialog";
import {MatLegacySliderModule as MatSliderModule} from "@angular/material/legacy-slider";
import {MatLegacyTabsModule as MatTabsModule} from "@angular/material/legacy-tabs";
import {ActivityManageLabelsComponent} from './activity-manage-labels/activity-manage-labels.component';
import {MatLegacyAutocompleteModule as MatAutocompleteModule} from "@angular/material/legacy-autocomplete";
import {
    ActivityManageDateIntervalsComponent
} from './activity-manage-date-intervals/activity-manage-date-intervals.component';
import {
    ActivityManageDateIntervalComponent
} from './activity-manage-date-interval/activity-manage-date-interval.component';
import {MatLegacyCheckboxModule as MatCheckboxModule} from "@angular/material/legacy-checkbox";
import {MatDividerModule} from "@angular/material/divider";


@NgModule({
    declarations: [ActivityAppComponent,
        ActivityLabelsComponent,
        ActivityLocationComponent,
        ActivityDateComponent,
        ActivitySearchResultComponent,
        ActivitySearchResultsComponent,
        ActivityMenuBarForSearchComponent,
        ActivityManageListComponent,
        ActivityManageDetailsComponent,
        ActivityMenuBarForManageComponent,
        ActivityConfirmDeleteComponent,
        ActivityManageLabelsComponent,
        ActivityManageDateIntervalsComponent,
        ActivityManageDateIntervalComponent],
    imports: [
        CommonModule,
        ActivityRoutingModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatChipsModule,
        MatExpansionModule,
        MatCardModule,
        MatDatepickerModule,
        MatInputModule,
        MatMomentDateModule,
        MatSlideToggleModule,
        FormsModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatDialogModule,
        MatSliderModule,
        MatTabsModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        MatCheckboxModule,
        MatDividerModule
    ]
})
export class ActivityModule {
}
