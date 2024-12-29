import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
    SocialMenuBarForOverviewComponent
} from "@app/social/social-menu-bar-for-overview/social-menu-bar-for-overview.component";
import {SocialManagePeopleComponent} from "@app/social/social-manage-people/social-manage-people.component";
import {
    SocialMenuBarForManagePeopleComponent
} from "@app/social/social-menu-bar-for-manage-people/social-menu-bar-for-manage-people.component";
import {SocialOverviewComponent} from "@app/social/social-overview/social-overview.component";


const routes: Routes = [{
    path: "",
    redirectTo: "overview",
}, {
    path: "",
    redirectTo: "overview",
    outlet: "menuBar"
}, {
    path: "overview",
    component: SocialOverviewComponent,
}, {
    path: "overview",
    component: SocialMenuBarForOverviewComponent,
    outlet: "menuBar"
}, {
    path: "manage-people",
    component: SocialManagePeopleComponent,
}, {
    path: "manage-people",
    component: SocialMenuBarForManagePeopleComponent,
    outlet: "menuBar"
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SocialRoutingModule {
}
