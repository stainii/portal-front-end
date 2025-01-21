import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HousagotchiRoutingModule} from './housagotchi-routing.module';
import {HousagotchiAppComponent} from './housagotchi-app/housagotchi-app.component';
import {HousagotchiAddExecutionComponent} from './housagotchi-add-execution/housagotchi-add-execution.component';
import {HousagotchiBalloonComponent} from './housagotchi-balloon/housagotchi-balloon.component';
import {HousagotchiCreatureComponent} from './housagotchi-creature/housagotchi-creature.component';
import {
    HousagotchiManageRecurringTasksComponent
} from './housagotchi-manage-recurring-tasks/housagotchi-manage-recurring-tasks.component';
import {
    HousagotchiMenuBarForCreatureComponent
} from './housagotchi-menu-bar-for-creature/housagotchi-menu-bar-for-creature.component';
import {
    HousagotchiMenuBarForManageRecurringTasksComponent
} from './housagotchi-menu-bar-for-manage-recurring-tasks/housagotchi-menu-bar-for-manage-recurring-tasks.component';
import {MatLegacyButtonModule as MatButtonModule} from "@angular/material/legacy-button";
import {MatLegacyCardModule as MatCardModule} from "@angular/material/legacy-card";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatLegacyFormFieldModule as MatFormFieldModule} from "@angular/material/legacy-form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatLegacyInputModule as MatInputModule} from "@angular/material/legacy-input";
import {MatLegacyListModule as MatListModule} from "@angular/material/legacy-list";
import {MatLegacyRadioModule as MatRadioModule} from "@angular/material/legacy-radio";
import {MatLegacySelectModule as MatSelectModule} from "@angular/material/legacy-select";
import {MatLegacySnackBarModule as MatSnackBarModule} from "@angular/material/legacy-snack-bar";
import {MatLegacyTableModule as MatTableModule} from "@angular/material/legacy-table";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatMomentDateModule} from "@angular/material-moment-adapter";
import {
    HousagotchiRecurringTaskDetailsComponent
} from './housagotchi-recurring-task-details/housagotchi-recurring-task-details.component';
import {RecurringTasksModule} from "@app/recurring-tasks/recurring-tasks.module";

@NgModule({
    imports: [
        CommonModule,
        HousagotchiRoutingModule,
        RecurringTasksModule,
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
        MatSnackBarModule,
        MatTableModule,
        MatRadioModule,
        ReactiveFormsModule,
    ],
    declarations: [
        HousagotchiAppComponent,
        HousagotchiAddExecutionComponent,
        HousagotchiBalloonComponent,
        HousagotchiCreatureComponent,
        HousagotchiManageRecurringTasksComponent,
        HousagotchiMenuBarForCreatureComponent,
        HousagotchiMenuBarForManageRecurringTasksComponent,
        HousagotchiRecurringTaskDetailsComponent
    ]
})
export class HousagotchiModule {

}
