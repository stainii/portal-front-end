import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HealthRoutingModule} from './health-routing.module';
import {HealthAppComponent} from './health-app/health-app.component';
import {HealthMenuBarForManageRecurringTasksComponent} from './health-menu-bar-for-manage-recurring-tasks/health-menu-bar-for-manage-recurring-tasks.component';
import {HealthManageRecurringTasksComponent} from './health-manage-recurring-tasks/health-manage-recurring-tasks.component';
import {HealthRecurringTaskDetailsComponent} from './health-recurring-task-details/health-recurring-task-details.component';
import {HealthSportySpiesComponent} from './health-sporty-spies/health-sporty-spies.component';
import {HealthBalloonComponent} from './health-balloon/health-balloon.component';
import {HealthAddExecutionComponent} from './health-add-execution/health-add-execution.component';
import {HealthMenuBarForSportySpiesComponent} from './health-menu-bar-for-sporty-spies/health-menu-bar-for-sporty-spies.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatMomentDateModule} from "@angular/material-moment-adapter";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatRadioModule} from "@angular/material/radio";
import {MatTableModule} from "@angular/material/table";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
    declarations: [
        HealthAppComponent,
        HealthMenuBarForManageRecurringTasksComponent,
        HealthManageRecurringTasksComponent,
        HealthRecurringTaskDetailsComponent,
        HealthSportySpiesComponent,
        HealthBalloonComponent,
        HealthAddExecutionComponent,
        HealthMenuBarForSportySpiesComponent],
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
    ], entryComponents: [
        HealthRecurringTaskDetailsComponent
    ]
})
export class HealthModule {
}
