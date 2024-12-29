import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HousagotchiAppComponent} from "@app/housagotchi/housagotchi-app/housagotchi-app.component";
import {
    HousagotchiManageRecurringTasksComponent
} from "@app/housagotchi/housagotchi-manage-recurring-tasks/housagotchi-manage-recurring-tasks.component";
import {
    HousagotchiMenuBarForCreatureComponent
} from "@app/housagotchi/housagotchi-menu-bar-for-creature/housagotchi-menu-bar-for-creature.component";
import {
    HousagotchiMenuBarForManageRecurringTasksComponent
} from "@app/housagotchi/housagotchi-menu-bar-for-manage-recurring-tasks/housagotchi-menu-bar-for-manage-recurring-tasks.component";

const routes: Routes = [{
    path: "",
    redirectTo: "creature"
}, {
    path: "",
    redirectTo: "creature",
    outlet: "menuBar"
}, {
    path: "creature",
    component: HousagotchiAppComponent,
}, {
    path: "creature",
    component: HousagotchiMenuBarForCreatureComponent,
    outlet: "menuBar"
}, {
    path: "recurring-tasks",
    component: HousagotchiManageRecurringTasksComponent,
}, {
    path: "recurring-tasks",
    component: HousagotchiMenuBarForManageRecurringTasksComponent,
    outlet: "menuBar"
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HousagotchiRoutingModule {
}
