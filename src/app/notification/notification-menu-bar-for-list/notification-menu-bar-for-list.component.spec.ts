import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {NotificationMenuBarForListComponent} from './notification-menu-bar-for-list.component';
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatListModule} from "@angular/material/list";
import {MatSelectModule} from "@angular/material/select";
import {RouterTestingModule} from "@angular/router/testing";

describe('NotificationMenuBarForListComponent', () => {
    let component: NotificationMenuBarForListComponent;
    let fixture: ComponentFixture<NotificationMenuBarForListComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [NotificationMenuBarForListComponent],
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
        fixture = TestBed.createComponent(NotificationMenuBarForListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
