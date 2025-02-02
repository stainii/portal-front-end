import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';





const routes: Routes = [{
    path: "",
    redirectTo: "creature"
}, {
    path: "",
    redirectTo: "creature",
    outlet: "menuBar"
}, {
    path: "creature",
    loadComponent: () => import('@app/housagotchi/housagotchi-app/housagotchi-app.component').then(m => m.HousagotchiAppComponent),
}, {
    path: "creature",
    loadComponent: () => import('@app/housagotchi/housagotchi-menu-bar-for-creature/housagotchi-menu-bar-for-creature.component').then(m => m.HousagotchiMenuBarForCreatureComponent),
    outlet: "menuBar"
}, {
    path: "recurring-tasks",
    loadComponent: () => import('@app/housagotchi/housagotchi-manage-recurring-tasks/housagotchi-manage-recurring-tasks.component').then(m => m.HousagotchiManageRecurringTasksComponent),
}, {
    path: "recurring-tasks",
    loadComponent: () => import('@app/housagotchi/housagotchi-menu-bar-for-manage-recurring-tasks/housagotchi-menu-bar-for-manage-recurring-tasks.component').then(m => m.HousagotchiMenuBarForManageRecurringTasksComponent),
    outlet: "menuBar"
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HousagotchiRoutingModule {
}
