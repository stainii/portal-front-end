import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NotificationMenuBarForSubscriptionsComponent} from './notification-menu-bar-for-subscriptions.component';
import {FormsModule} from "@angular/forms";
import {MatLegacyButtonModule as MatButtonModule} from "@angular/material/legacy-button";
import {MatLegacyCardModule as MatCardModule} from "@angular/material/legacy-card";
import {MatLegacyFormFieldModule as MatFormFieldModule} from "@angular/material/legacy-form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatLegacyInputModule as MatInputModule} from "@angular/material/legacy-input";
import {MatLegacyListModule as MatListModule} from "@angular/material/legacy-list";
import {MatLegacySelectModule as MatSelectModule} from "@angular/material/legacy-select";
import {RouterTestingModule} from "@angular/router/testing";

describe('NotificationMenuBarForSubscriptionsComponent', () => {
    let component: NotificationMenuBarForSubscriptionsComponent;
    let fixture: ComponentFixture<NotificationMenuBarForSubscriptionsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NotificationMenuBarForSubscriptionsComponent],
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
                RouterTestingModule.withRoutes([]),
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NotificationMenuBarForSubscriptionsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
