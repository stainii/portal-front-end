import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SetlistAppComponent} from "@app/setlist/setlist-app/setlist-app.component";
import {
    SetlistMenuBarForListComponent
} from "@app/setlist/setlist-menu-bar-for-list/setlist-menu-bar-for-list.component";
import {SetlistManageComponent} from "@app/setlist/setlist-manage/setlist-manage.component";
import {
    SetlistMenuBarForManageComponent
} from "@app/setlist/setlist-menu-bar-for-manage/setlist-menu-bar-for-manage.component";


const routes: Routes = [{
    path: "",
    redirectTo: "list",
}, {
    path: "",
    redirectTo: "list",
    outlet: "menuBar"
}, {
    path: "list",
    component: SetlistAppComponent,
}, {
    path: "list",
    component: SetlistMenuBarForListComponent,
    outlet: "menuBar"
}, {
    path: "manage",
    component: SetlistManageComponent,
}, {
    path: "manage",
    component: SetlistMenuBarForManageComponent,
    outlet: "menuBar"
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SetlistRoutingModule {
}
