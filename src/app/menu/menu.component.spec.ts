import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MenuComponent} from './menu.component';
import {MatLegacyListModule as MatListModule} from "@angular/material/legacy-list";

describe('MenuComponent', () => {
    let component: MenuComponent;
    let fixture: ComponentFixture<MenuComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MenuComponent],
            imports: [
                MatListModule,
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
