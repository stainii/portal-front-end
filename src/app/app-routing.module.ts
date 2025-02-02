import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthenticationGuardService} from "@app/user/authentication-guard.service";
import {LoginPageGuardService} from "@app/user/login-page-guard.service";


const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('@app/user/login/login.component').then(m => m.LoginComponent),
        canActivate: [LoginPageGuardService]
    }, {
        path: 'notifications',
        loadChildren: () => import('./notification/notification.module').then(m => m.NotificationModule),
        canActivate: [AuthenticationGuardService]
    }, {
        path: 'housagotchi',
        loadChildren: () => import('./housagotchi/housagotchi.module').then(m => m.HousagotchiModule),
        canActivate: [AuthenticationGuardService]
    }, {
        path: 'todo',
        loadChildren: () => import('./todo/todo.module').then(m => m.TodoModule),
        canActivate: [AuthenticationGuardService]
    }, {
        path: 'health',
        loadChildren: () => import('./health/health.module').then(m => m.HealthModule),
        canActivate: [AuthenticationGuardService]
    }, {
        path: 'setlist',
        loadChildren: () => import('./setlist/setlist.module').then(m => m.SetlistModule),
        canActivate: [AuthenticationGuardService]
    }, {
        path: 'social',
        loadChildren: () => import('./social/social.module').then(m => m.SocialModule),
        canActivate: [AuthenticationGuardService]
    }, {
        path: 'activity',
        loadChildren: () => import('./activity/activity.module').then(m => m.ActivityModule),
        canActivate: [AuthenticationGuardService]
    }, {
        path: "**",
        loadComponent: () => import('@app/user/login/login.component').then(m => m.LoginComponent),
        canActivate: [LoginPageGuardService]
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
    declarations: []
})
export class AppRoutingModule {

}
