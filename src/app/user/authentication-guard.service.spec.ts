import {inject, TestBed} from '@angular/core/testing';

import {AuthenticationGuardService} from './authentication-guard.service';
import {ActivatedRouteSnapshot, Router} from "@angular/router";
import {UserService} from "./user.service";

describe('AuthenticationGuardService', () => {
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
            providers: [AuthenticationGuardService,
                {provide: UserService, useValue: userService},
                {provide: Router, useValue: router}
            ],
        });
    });

    it('should be created', inject([AuthenticationGuardService], (service: AuthenticationGuardService) => {
        expect(service).toBeTruthy();
    }));

    it('should allow a authenticated user to go to the  page', inject([AuthenticationGuardService], (service: AuthenticationGuardService) => {
        userService.isLoggedIn.and.returnValue(true);
        expect(service.canActivate(route, state)).toBeTruthy();
    }));

    it('should not allow a unauthenticated user to go to the login page', inject([AuthenticationGuardService], (service: AuthenticationGuardService) => {
        userService.isLoggedIn.and.returnValue(false);
        expect(service.canActivate(route, state)).toBeFalsy();
    }));

});
