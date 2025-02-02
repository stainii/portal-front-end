import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';






const routes: Routes = [{
    path: "",
    redirectTo: "list",
}, {
    path: "",
    redirectTo: "list",
    outlet: "menuBar"
}, {
    path: "list",
    loadComponent: () => import('@app/setlist/setlist-app/setlist-app.component').then(m => m.SetlistAppComponent),
}, {
    path: "list",
    loadComponent: () => import('@app/setlist/setlist-menu-bar-for-list/setlist-menu-bar-for-list.component').then(m => m.SetlistMenuBarForListComponent),
    outlet: "menuBar"
}, {
    path: "manage",
    loadComponent: () => import('@app/setlist/setlist-manage/setlist-manage.component').then(m => m.SetlistManageComponent),
}, {
    path: "manage",
    loadComponent: () => import('@app/setlist/setlist-menu-bar-for-manage/setlist-menu-bar-for-manage.component').then(m => m.SetlistMenuBarForManageComponent),
    outlet: "menuBar"
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SetlistRoutingModule {
}
