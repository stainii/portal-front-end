import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NotificationListComponent} from './notification-list.component';
import {NotificationComponent} from "@app/notification/notification/notification.component";
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

describe('NotificationListComponent', () => {
    let component: NotificationListComponent;
    let fixture: ComponentFixture<NotificationListComponent>;
    let apiService;

    beforeEach(async(() => {
        apiService = jasmine.createSpyObj("TokenService", ["logIn"]);

        TestBed.configureTestingModule({
            declarations: [NotificationListComponent, NotificationComponent],
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
        fixture = TestBed.createComponent(NotificationListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
