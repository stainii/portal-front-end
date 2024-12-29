import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
    TodoMenuBarForOverviewComponent
} from "@app/todo/todo-menu-bar-for-overview/todo-menu-bar-for-overview.component";
import {TodoAppComponent} from "@app/todo/todo-app/todo-app.component";
import {
    TodoMenuBarForTemplatesComponent
} from "@app/todo/todo-menu-bar-for-templates/todo-menu-bar-for-templates.component";
import {TodoTemplatesComponent} from "@app/todo/todo-templates/todo-templates.component";
import {TodoSubscriptionEditorComponent} from "@app/todo/todo-subscription-editor/todo-subscription-editor.component";
import {
    TodoMenuBarForSubscriptionsComponent
} from "@app/todo/todo-menu-bar-for-subscriptions/todo-menu-bar-for-subscriptions.component";

const routes: Routes = [{
    path: "",
    redirectTo: "overview"
}, {
    path: "",
    redirectTo: "overview",
    outlet: "menuBar"
}, {
    path: "overview",
    component: TodoAppComponent
}, {
    path: "overview",
    component: TodoMenuBarForOverviewComponent,
    outlet: "menuBar"
}, {
    path: "templates",
    component: TodoTemplatesComponent
}, {
    path: "templates",
    component: TodoMenuBarForTemplatesComponent,
    outlet: "menuBar"
},  {
    path: "subscriptions",
    component: TodoSubscriptionEditorComponent,
}, {
    path: "subscriptions",
    component: TodoMenuBarForSubscriptionsComponent,
    outlet: "menuBar"
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TodoRoutingModule {
}
