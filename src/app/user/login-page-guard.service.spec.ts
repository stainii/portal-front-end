import {inject, TestBed} from '@angular/core/testing';

import {ActivatedRouteSnapshot, Router} from "@angular/router";
import {UserService} from "./user.service";
import {LoginPageGuardService} from "@app/user/login-page-guard.service";

describe('LoginPageGuardService', () => {
    let userService;
    let router;
    let route;
    let state;

    beforeEach(() => {
        userService = jasmine.createSpyObj('UserService', ['isLoggedIn']);
        router = jasmine.createSpyObj("Router", ["navigate"]);
        route = new ActivatedRouteSnapshot();
        state = jasmine.createSpyObj("RouterStateSnapshot", ['toString']);
        TestBed.configureTestingModule({
            providers: [LoginPageGuardService,
                {provide: UserService, useValue: userService},
                {provide: Router, useValue: router}
            ],
        });
    });

    it('should be created', inject([LoginPageGuardService], (service: LoginPageGuardService) => {
        expect(service).toBeTruthy();
    }));

    it('should not allow a authenticated user to go to the login page', inject([LoginPageGuardService], (service: LoginPageGuardService) => {
        userService.isLoggedIn.and.returnValue(true);
        expect(service.canActivate(route, state)).toBeFalsy();
    }));

    it('should allow a unauthenticated user to go to the login page', inject([LoginPageGuardService], (service: LoginPageGuardService) => {
        userService.isLoggedIn.and.returnValue(false);
        expect(service.canActivate(route, state)).toBeTruthy();
    }));

});
