import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';







const routes: Routes = [{
    path: "",
    loadComponent: () => import('@app/activity/activity-app/activity-app.component').then(m => m.ActivityAppComponent),
}, {
    path: "",
    loadComponent: () => import('@app/activity/activity-menu-bar-for-search/activity-menu-bar-for-search.component').then(m => m.ActivityMenuBarForSearchComponent),
    outlet: "menuBar"
}, {
    path: "manage",
    loadComponent: () => import('@app/activity/activity-manage-list/activity-manage-list.component').then(m => m.ActivityManageListComponent),
}, {
    path: "manage",
    loadComponent: () => import('@app/activity/activity-menu-bar-for-manage/activity-menu-bar-for-manage.component').then(m => m.ActivityMenuBarForManageComponent),
    outlet: "menuBar"
}, {
    path: "manage/:id",
    loadComponent: () => import('@app/activity/activity-manage-details/activity-manage-details.component').then(m => m.ActivityManageDetailsComponent),
}, {
    path: "manage/:id",
    loadComponent: () => import('@app/activity/activity-menu-bar-for-manage/activity-menu-bar-for-manage.component').then(m => m.ActivityMenuBarForManageComponent),
    outlet: "menuBar"
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivityRoutingModule { }
