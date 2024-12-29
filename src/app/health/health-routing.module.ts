import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HealthAppComponent} from "@app/health/health-app/health-app.component";
import {
    HealthMenuBarForSportySpiceComponent
} from "@app/health/health-menu-bar-for-sporty-spice/health-menu-bar-for-sporty-spice.component";
import {
    HealthManageRecurringTasksComponent
} from "@app/health/health-manage-recurring-tasks/health-manage-recurring-tasks.component";
import {
    HealthMenuBarForManageRecurringTasksComponent
} from "@app/health/health-menu-bar-for-manage-recurring-tasks/health-menu-bar-for-manage-recurring-tasks.component";


const routes: Routes = [{
    path: "",
    redirectTo: "status"
}, {
    path: "",
    redirectTo: "status",
    outlet: "menuBar"
}, {
    path: "status",
    component: HealthAppComponent,
}, {
    path: "status",
    component: HealthMenuBarForSportySpiceComponent,
    outlet: "menuBar"
}, {
    path: "recurring-tasks",
    component: HealthManageRecurringTasksComponent,
}, {
    path: "recurring-tasks",
    component: HealthMenuBarForManageRecurringTasksComponent,
    outlet: "menuBar"
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HealthRoutingModule {
}
