import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TodoRoutingModule} from './todo-routing.module';
import {TodoOverviewComponent} from './todo-overview/todo-overview.component';
import {TodoMenuBarForOverviewComponent} from './todo-menu-bar-for-overview/todo-menu-bar-for-overview.component';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatIconModule} from "@angular/material/icon";
import {TodoTaskPanelComponent} from './todo-task-panel/todo-task-panel.component';
import {MatSelectModule} from "@angular/material/select";
import {TodoAppComponent} from './todo-app/todo-app.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatStepperModule} from "@angular/material/stepper";
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatMomentDateModule} from "@angular/material-moment-adapter";
import {TodoMenuBarForTemplatesComponent} from './todo-menu-bar-for-templates/todo-menu-bar-for-templates.component';
import {TodoTemplatesComponent} from './todo-templates/todo-templates.component';
import {MatTreeModule} from "@angular/material/tree";
import {TodoTaskTemplateDetailsComponent} from "@app/todo/todo-task-template-details/todo-task-template-details.component";
import {TodoTaskTemplatesComponent} from './todo-task-templates/todo-task-templates.component';
import {MatTabsModule} from "@angular/material/tabs";
import {MatListModule} from "@angular/material/list";
import {TodoTaskDefinitionDetailsComponent} from './todo-task-definition-details/todo-task-definition-details.component';
import {TodoTaskTemplateEntryDetailsComponent} from './todo-task-template-entry-details/todo-task-template-entry-details.component';
import {TodoTaskDetailsComponent} from './todo-task-details/todo-task-details.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import {HammerModule} from "@angular/platform-browser";
import {TodoSubscriptionDetailsComponent} from './todo-subscription-details/todo-subscription-details.component';
import {TodoSubscriptionEditorComponent} from './todo-subscription-editor/todo-subscription-editor.component';
import {TodoSubscriptionListComponent} from './todo-subscription-list/todo-subscription-list.component';
import {TodoMenuBarForSubscriptionsComponent} from './todo-menu-bar-for-subscriptions/todo-menu-bar-for-subscriptions.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

@NgModule({
    declarations: [
        TodoOverviewComponent,
        TodoMenuBarForOverviewComponent,
        TodoTaskPanelComponent,
        TodoAppComponent,
        TodoMenuBarForTemplatesComponent,
        TodoTemplatesComponent,
        TodoTaskTemplateDetailsComponent,
        TodoTaskTemplatesComponent,
        TodoTaskDefinitionDetailsComponent,
        TodoTaskTemplateEntryDetailsComponent,
        TodoTaskDetailsComponent,
        TodoSubscriptionDetailsComponent,
        TodoSubscriptionEditorComponent,
        TodoSubscriptionListComponent,
        TodoMenuBarForSubscriptionsComponent
    ],
    imports: [
        CommonModule,
        TodoRoutingModule,
        MatCardModule,
        MatButtonModule,
        MatExpansionModule,
        MatIconModule,
        MatSelectModule,
        MatDialogModule,
        MatStepperModule,
        FormsModule,
        MatInputModule,
        MatDatepickerModule,
        MatMomentDateModule,
        MatTreeModule,
        MatTabsModule,
        MatListModule,
        MatTooltipModule,
        MatAutocompleteModule,
        HammerModule
    ]
})
export class TodoModule {
}
