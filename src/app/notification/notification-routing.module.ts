import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';





const routes: Routes = [
    {
        path: "",
        loadComponent: () => import('@app/notification/notification-app/notification-app.component').then(m => m.NotificationAppComponent),
    }, {
        path: "",
        loadComponent: () => import('@app/notification/notification-menu-bar-for-list/notification-menu-bar-for-list.component').then(m => m.NotificationMenuBarForListComponent),
        outlet: "menuBar"
    }, {
        path: "subscription",
        loadComponent: () => import('@app/notification/notification-subscription-editor/notification-subscription-editor.component').then(m => m.NotificationSubscriptionEditorComponent),
    }, {
        path: "subscription",
        loadComponent: () => import('@app/notification/notification-menu-bar-for-subscriptions/notification-menu-bar-for-subscriptions.component').then(m => m.NotificationMenuBarForSubscriptionsComponent),
        outlet: "menuBar"
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationRoutingModule { }
