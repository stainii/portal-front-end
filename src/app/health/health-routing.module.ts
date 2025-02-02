import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';






const routes: Routes = [{
    path: "",
    redirectTo: "status"
}, {
    path: "",
    redirectTo: "status",
    outlet: "menuBar"
}, {
    path: "status",
    loadComponent: () => import('@app/health/health-app/health-app.component').then(m => m.HealthAppComponent),
}, {
    path: "status",
    loadComponent: () => import('@app/health/health-menu-bar-for-sporty-spice/health-menu-bar-for-sporty-spice.component').then(m => m.HealthMenuBarForSportySpiceComponent),
    outlet: "menuBar"
}, {
    path: "recurring-tasks",
    loadComponent: () => import('@app/health/health-manage-recurring-tasks/health-manage-recurring-tasks.component').then(m => m.HealthManageRecurringTasksComponent),
}, {
    path: "recurring-tasks",
    loadComponent: () => import('@app/health/health-menu-bar-for-manage-recurring-tasks/health-menu-bar-for-manage-recurring-tasks.component').then(m => m.HealthMenuBarForManageRecurringTasksComponent),
    outlet: "menuBar"
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HealthRoutingModule {
}
