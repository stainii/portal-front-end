import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {canActivateAuthRole} from "@app/user/authentication-guard.service";


const routes: Routes = [
  {
    path: 'notifications',
    loadChildren: () => import('./notification/notification.module').then(m => m.NotificationModule),
    canActivate: [canActivateAuthRole]
  }, {
    path: 'housagotchi',
    loadChildren: () => import('./housagotchi/housagotchi.module').then(m => m.HousagotchiModule),
    canActivate: [canActivateAuthRole]
  }, {
    path: 'todo',
    loadChildren: () => import('./todo/todo.module').then(m => m.TodoModule),
    canActivate: [canActivateAuthRole]
  }, {
    path: 'health',
    loadChildren: () => import('./health/health.module').then(m => m.HealthModule),
    canActivate: [canActivateAuthRole]
  }, {
    path: 'setlist',
    loadChildren: () => import('./setlist/setlist.module').then(m => m.SetlistModule),
    canActivate: [canActivateAuthRole]
  }, {
    path: 'social',
    loadChildren: () => import('./social/social.module').then(m => m.SocialModule),
    canActivate: [canActivateAuthRole]
  }, {
    path: 'activity',
    loadChildren: () => import('./activity/activity.module').then(m => m.ActivityModule),
    canActivate: [canActivateAuthRole]
  },
  {
    path: "**",
    redirectTo: 'todo'
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
