import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {MenuComponent} from './menu.component';
import {MatListModule} from "@angular/material/list";
import { ActivatedRoute } from '@angular/router';
import {of} from "rxjs";

describe('MenuComponent', () => {
    let component: MenuComponent;
    let fixture: ComponentFixture<MenuComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                MatListModule,
                MenuComponent,
            ], providers: [
                {
                    provide: ActivatedRoute,
                    useValue: {
                        params: of({}) // Mock any required params here
                    }
                }
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
