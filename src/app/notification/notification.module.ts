import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NotificationRoutingModule} from './notification-routing.module';
import {NotificationListComponent} from './notification-list/notification-list.component';
import {NotificationAppComponent} from './notification-app/notification-app.component';
import {NotificationComponent} from "@app/notification/notification/notification.component";
import {
    NotificationSubscriptionEditorComponent
} from "@app/notification/notification-subscription-editor/notification-subscription-editor.component";
import {
    NotificationSubscriptionDetailsComponent
} from "@app/notification/notification-subscription-details/notification-subscription-details.component";
import {
    NotificationSubscriptionListComponent
} from "@app/notification/notification-subscription-list/notification-subscription-list.component";
import {FormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthenticationHttpInterceptor} from "@app/user/authentication.interceptor";
/* manage font-awesome icons */
import {
    NotificationMenuBarForListComponent
} from './notification-menu-bar-for-list/notification-menu-bar-for-list.component';
import {
    NotificationMenuBarForSubscriptionsComponent
} from './notification-menu-bar-for-subscriptions/notification-menu-bar-for-subscriptions.component';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatListModule} from "@angular/material/list";
import {MatSelectModule} from "@angular/material/select";

@NgModule({
    imports: [
        CommonModule,
        NotificationRoutingModule,
        HttpClientModule,
        FormsModule,
        MatIconModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
    ],
    declarations: [
        NotificationListComponent,
        NotificationAppComponent,
        NotificationComponent,
        NotificationSubscriptionEditorComponent,
        NotificationSubscriptionListComponent,
        NotificationSubscriptionDetailsComponent,
        NotificationMenuBarForListComponent,
        NotificationMenuBarForSubscriptionsComponent
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthenticationHttpInterceptor,
            multi: true
        }
    ]
})
export class NotificationModule {
}
