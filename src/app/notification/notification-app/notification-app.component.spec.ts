import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NotificationAppComponent} from './notification-app.component';
import {NotificationListComponent} from "@app/notification/notification-list/notification-list.component";
import {
    NotificationSubscriptionEditorComponent
} from "@app/notification/notification-subscription-editor/notification-subscription-editor.component";
import {NotificationComponent} from "@app/notification/notification/notification.component";
import {
    NotificationSubscriptionListComponent
} from "@app/notification/notification-subscription-list/notification-subscription-list.component";
import {
    NotificationSubscriptionDetailsComponent
} from "@app/notification/notification-subscription-details/notification-subscription-details.component";
import {FormsModule} from "@angular/forms";
import {MatLegacyButtonModule as MatButtonModule} from "@angular/material/legacy-button";
import {MatLegacyCardModule as MatCardModule} from "@angular/material/legacy-card";
import {MatLegacyFormFieldModule as MatFormFieldModule} from "@angular/material/legacy-form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatLegacyInputModule as MatInputModule} from "@angular/material/legacy-input";
import {MatLegacyListModule as MatListModule} from "@angular/material/legacy-list";
import {MatLegacySelectModule as MatSelectModule} from "@angular/material/legacy-select";
import {TokenService} from "@app/user/token.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('NotificationAppComponent', () => {
    let component: NotificationAppComponent;
    let fixture: ComponentFixture<NotificationAppComponent>;
    let apiService;

    beforeEach(async(() => {
        apiService = jasmine.createSpyObj("TokenService", ["logIn"]);

        TestBed.configureTestingModule({
            declarations: [NotificationAppComponent,
                NotificationListComponent,
                NotificationSubscriptionEditorComponent,
                NotificationComponent,
                NotificationSubscriptionListComponent,
                NotificationSubscriptionDetailsComponent],
            imports: [
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
                HttpClientTestingModule
            ], providers: [
                {provide: TokenService, useValue: apiService},
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NotificationAppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
