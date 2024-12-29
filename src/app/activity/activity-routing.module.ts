import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ActivityAppComponent} from "@app/activity/activity-app/activity-app.component";
import {
    ActivityMenuBarForSearchComponent
} from "@app/activity/activity-menu-bar-for-search/activity-menu-bar-for-search.component";
import {
    ActivityMenuBarForManageComponent
} from "@app/activity/activity-menu-bar-for-manage/activity-menu-bar-for-manage.component";
import {ActivityManageListComponent} from "@app/activity/activity-manage-list/activity-manage-list.component";
import {ActivityManageDetailsComponent} from "@app/activity/activity-manage-details/activity-manage-details.component";


const routes: Routes = [{
    path: "",
    component: ActivityAppComponent,
}, {
    path: "",
    component: ActivityMenuBarForSearchComponent,
    outlet: "menuBar"
}, {
    path: "manage",
    component: ActivityManageListComponent,
}, {
    path: "manage",
    component: ActivityMenuBarForManageComponent,
    outlet: "menuBar"
}, {
    path: "manage/:id",
    component: ActivityManageDetailsComponent,
}, {
    path: "manage/:id",
    component: ActivityMenuBarForManageComponent,
    outlet: "menuBar"
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivityRoutingModule { }
