import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HealthRoutingModule} from './health-routing.module';
import {HealthAppComponent} from './health-app/health-app.component';
import {
    HealthMenuBarForManageRecurringTasksComponent
} from './health-menu-bar-for-manage-recurring-tasks/health-menu-bar-for-manage-recurring-tasks.component';
import {
    HealthManageRecurringTasksComponent
} from './health-manage-recurring-tasks/health-manage-recurring-tasks.component';
import {
    HealthRecurringTaskDetailsComponent
} from './health-recurring-task-details/health-recurring-task-details.component';
import {HealthSportySpiceComponent} from './health-sporty-spice/health-sporty-spice.component';
import {HealthBalloonComponent} from './health-balloon/health-balloon.component';
import {HealthAddExecutionComponent} from './health-add-execution/health-add-execution.component';
import {
    HealthMenuBarForSportySpiceComponent
} from './health-menu-bar-for-sporty-spice/health-menu-bar-for-sporty-spice.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatMomentDateModule} from "@angular/material-moment-adapter";
import {MatLegacyFormFieldModule as MatFormFieldModule} from "@angular/material/legacy-form-field";
import {MatLegacyRadioModule as MatRadioModule} from "@angular/material/legacy-radio";
import {MatLegacyTableModule as MatTableModule} from "@angular/material/legacy-table";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatLegacySelectModule as MatSelectModule} from "@angular/material/legacy-select";
import {MatLegacyInputModule as MatInputModule} from "@angular/material/legacy-input";
import {MatLegacyCardModule as MatCardModule} from "@angular/material/legacy-card";
import {MatLegacyListModule as MatListModule} from "@angular/material/legacy-list";
import {MatIconModule} from "@angular/material/icon";
import {MatLegacyButtonModule as MatButtonModule} from "@angular/material/legacy-button";


@NgModule({
    declarations: [
        HealthAppComponent,
        HealthMenuBarForManageRecurringTasksComponent,
        HealthManageRecurringTasksComponent,
        HealthRecurringTaskDetailsComponent,
        HealthSportySpiceComponent,
        HealthBalloonComponent,
        HealthAddExecutionComponent,
        HealthMenuBarForSportySpiceComponent],
    imports: [
        CommonModule,
        HealthRoutingModule,
        FormsModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatMomentDateModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        MatTableModule,
        MatRadioModule
    ]
})
export class HealthModule {
}
