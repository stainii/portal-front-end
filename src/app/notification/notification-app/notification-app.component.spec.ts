import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

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
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatListModule} from "@angular/material/list";
import {MatSelectModule} from "@angular/material/select";
import {TokenService} from "@app/user/token.service";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('NotificationAppComponent', () => {
    let component: NotificationAppComponent;
    let fixture: ComponentFixture<NotificationAppComponent>;
    let apiService;

    beforeEach(waitForAsync(() => {
        apiService = jasmine.createSpyObj("TokenService", ["logIn"]);

        TestBed.configureTestingModule({
    declarations: [NotificationAppComponent,
        NotificationListComponent,
        NotificationSubscriptionEditorComponent,
        NotificationComponent,
        NotificationSubscriptionListComponent,
        NotificationSubscriptionDetailsComponent],
    imports: [FormsModule,
        MatIconModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule],
    providers: [
        { provide: TokenService, useValue: apiService },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
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
