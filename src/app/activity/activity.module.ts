import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ActivityRoutingModule} from './activity-routing.module';
import {ActivityAppComponent} from './activity-app/activity-app.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatChipsModule} from "@angular/material/chips";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatCardModule} from "@angular/material/card";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatMomentDateModule} from "@angular/material-moment-adapter";
import {ActivityLabelsComponent} from './activity-labels/activity-labels.component';
import {ActivityLocationComponent} from './activity-location/activity-location.component';
import {ActivityDateComponent} from './activity-date/activity-date.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {ActivitySearchResultComponent} from './activity-search-result/activity-search-result.component';
import {ActivitySearchResultsComponent} from './activity-search-results/activity-search-results.component';
import {ActivityMenuBarForSearchComponent} from './activity-menu-bar-for-search/activity-menu-bar-for-search.component';
import {ActivityManageListComponent} from './activity-manage-list/activity-manage-list.component';
import {ActivityManageDetailsComponent} from './activity-manage-details/activity-manage-details.component';
import {ActivityMenuBarForManageComponent} from './activity-menu-bar-for-manage/activity-menu-bar-for-manage.component';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {ActivityConfirmDeleteComponent} from './activity-confirm-delete/activity-confirm-delete.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatSliderModule} from "@angular/material/slider";
import {MatTabsModule} from "@angular/material/tabs";
import {ActivityManageLabelsComponent} from './activity-manage-labels/activity-manage-labels.component';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {
    ActivityManageDateIntervalsComponent
} from './activity-manage-date-intervals/activity-manage-date-intervals.component';
import {
    ActivityManageDateIntervalComponent
} from './activity-manage-date-interval/activity-manage-date-interval.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatDividerModule} from "@angular/material/divider";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatFormFieldModule} from "@angular/material/form-field";


@NgModule({
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
        MatDividerModule,
        MatSnackBarModule,
        MatFormFieldModule,
        ActivityAppComponent,
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
        ActivityManageDateIntervalComponent,
    ]
})
export class ActivityModule {
}
