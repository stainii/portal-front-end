import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';







const routes: Routes = [{
    path: "",
    redirectTo: "overview"
}, {
    path: "",
    redirectTo: "overview",
    outlet: "menuBar"
}, {
    path: "overview",
    loadComponent: () => import('@app/todo/todo-app/todo-app.component').then(m => m.TodoAppComponent)
}, {
    path: "overview",
    loadComponent: () => import('@app/todo/todo-menu-bar-for-overview/todo-menu-bar-for-overview.component').then(m => m.TodoMenuBarForOverviewComponent),
    outlet: "menuBar"
}, {
    path: "templates",
    loadComponent: () => import('@app/todo/todo-templates/todo-templates.component').then(m => m.TodoTemplatesComponent)
}, {
    path: "templates",
    loadComponent: () => import('@app/todo/todo-menu-bar-for-templates/todo-menu-bar-for-templates.component').then(m => m.TodoMenuBarForTemplatesComponent),
    outlet: "menuBar"
},  {
    path: "subscriptions",
    loadComponent: () => import('@app/todo/todo-subscription-editor/todo-subscription-editor.component').then(m => m.TodoSubscriptionEditorComponent),
}, {
    path: "subscriptions",
    loadComponent: () => import('@app/todo/todo-menu-bar-for-subscriptions/todo-menu-bar-for-subscriptions.component').then(m => m.TodoMenuBarForSubscriptionsComponent),
    outlet: "menuBar"
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TodoRoutingModule {
}
