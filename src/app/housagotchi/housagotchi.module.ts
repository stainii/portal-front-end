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
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatListModule} from "@angular/material/list";
import {MatRadioModule} from "@angular/material/radio";
import {MatSelectModule} from "@angular/material/select";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatTableModule} from "@angular/material/table";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatMomentDateModule} from "@angular/material-moment-adapter";
import {
    HousagotchiRecurringTaskDetailsComponent
} from './housagotchi-recurring-task-details/housagotchi-recurring-task-details.component';
import {RecurringTasksModule} from "@app/recurring-tasks/recurring-tasks.module";
import {MatDialogModule} from "@angular/material/dialog";

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
        MatDialogModule
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
