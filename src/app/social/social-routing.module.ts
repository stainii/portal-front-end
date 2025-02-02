import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';






const routes: Routes = [{
    path: "",
    redirectTo: "overview",
}, {
    path: "",
    redirectTo: "overview",
    outlet: "menuBar"
}, {
    path: "overview",
    loadComponent: () => import('@app/social/social-overview/social-overview.component').then(m => m.SocialOverviewComponent),
}, {
    path: "overview",
    loadComponent: () => import('@app/social/social-menu-bar-for-overview/social-menu-bar-for-overview.component').then(m => m.SocialMenuBarForOverviewComponent),
    outlet: "menuBar"
}, {
    path: "manage-people",
    loadComponent: () => import('@app/social/social-manage-people/social-manage-people.component').then(m => m.SocialManagePeopleComponent),
}, {
    path: "manage-people",
    loadComponent: () => import('@app/social/social-menu-bar-for-manage-people/social-menu-bar-for-manage-people.component').then(m => m.SocialMenuBarForManagePeopleComponent),
    outlet: "menuBar"
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SocialRoutingModule {
}
