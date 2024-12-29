import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LogoutComponent} from './logout.component';
import {UserService} from "../user.service";
import {MatIconModule} from "@angular/material/icon";
import {Router} from "@angular/router";

describe('LogoutComponent', () => {
    let component: LogoutComponent;
    let fixture: ComponentFixture<LogoutComponent>;
    let userService;
    let router;

    beforeEach(async(() => {
        userService = jasmine.createSpyObj("UserService", ["logOut"]);
        router = jasmine.createSpyObj("Router", ["navigate"]);
        TestBed.configureTestingModule({
            declarations: [LogoutComponent],
            providers: [
                {provide: UserService, useValue: userService},
                {provide: Router, useValue: router}
            ], imports: [
                MatIconModule
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LogoutComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should log out', () => {
        component.logOut();
        expect(userService.logOut).toHaveBeenCalled();
        expect(router.navigate).toHaveBeenCalledWith(["login"]);
    });
});
