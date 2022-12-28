import {inject, TestBed} from '@angular/core/testing';

import {UserService} from './user.service';
import {TokenService} from "./token.service";
import {of} from "rxjs";
import {Token} from "./token.model";
import {User} from "./user.model";
import {LocalStorageService} from "@app/util/local-storage.service";

describe('UserService', () => {
    let tokenService;
    let storage;
    const dummyToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdGlqbiIsImF1dGhvcml0aWVzIjpbIlJPTEVfQURNSU4iXSwiaWF0IjoxNTQxNTI1NTE2LCJleHAiOjE1NDE2MTE5MTZ9.fao0Ytttr0Kcylc4I-Pa9k6Cm-42XTKPo1IDG0-R4mBhXufsYRtOi25sKeL6_PheKHenEL-OLxsdFGUX4-j9Kg";

    beforeEach(() => {
        tokenService = jasmine.createSpyObj("TokenService", ["logIn"]);
        storage = jasmine.createSpyObj("LocalStorageService", ["store", "retrieve", "clear"]);

        TestBed.configureTestingModule({
            providers: [UserService,
                {provide: TokenService, useValue: tokenService},
                {provide: LocalStorageService, useValue: storage}
            ],
        });
    });

    it('should be created', inject([UserService], (service: UserService) => {
        expect(service).toBeTruthy();
        expect(storage.retrieve).toHaveBeenCalledWith("user");
    }));

    it('should fetch the user from local storage on creation of the service', () => {
        // data
        let user = new User("ai ai ai ai ai ai ai Puerto Rico", new Token(dummyToken));

        // mock
        storage.retrieve.and.returnValue(user);

        // execute constructor
        let userService = new UserService(tokenService, storage);

        // assert
        expect(userService.getLoggedInUser()).toEqual(user);
    });

    it('should tell if the user is logged in', done => {
        inject([UserService], (service: UserService) => {
            // mock
            tokenService.logIn.and.returnValue(of(new Token(dummyToken)));

            // execute and assert
            service.logIn("Ms. Jackson", "I am for real").subscribe(user => {
                expect(user).toEqual(service.getLoggedInUser());
                expect(service.isLoggedIn()).toBeTruthy();
                expect(storage.store).toHaveBeenCalled();
                done();
            });
        })();
    });

    it('should tell if the user is logged in when the user is not logged in', inject([UserService], (service: UserService) => {
        expect(service.isLoggedIn()).toBeFalsy();
        expect(storage.retrieve).toHaveBeenCalled();
    }));

    it('should tell if the user is not logged in when the user was logged in but is now logged out', done => {
        inject([UserService], (service: UserService) => {
            // mock
            tokenService.logIn.and.returnValue(of(new Token(dummyToken)));

            // execute
            service.logIn("Ms. Jackson", "I am for real").subscribe(() => {
                service.logOut();

                // assert
                expect(service.isLoggedIn()).toBeFalsy();
                expect(storage.store).toHaveBeenCalled();
                expect(storage.clear).toHaveBeenCalled();
                done();
            });
        })();
    });

    it('should return the user when the user is logged in', done => {
        inject([UserService], (service: UserService) => {
            // mock
            tokenService.logIn.and.returnValue(of(new Token(dummyToken)));

            // execute and assert
            service.logIn("Ms. Jackson", "I am for real").subscribe(user => {
                expect(user).toEqual(service.getLoggedInUser());
                expect(user.username).toEqual("Ms. Jackson");
                expect(user.token.value).toEqual(dummyToken);
                expect(storage.store).toHaveBeenCalled();
                done();
            });
        })();
    });

    it('should return null when the user is not logged in', inject([UserService], (service: UserService) => {
        expect(service.getLoggedInUser()).toBeNull();
        expect(storage.retrieve).toHaveBeenCalled();
    }));

    it('should return null when the user was logged in but is now logged out', done => {
        inject([UserService], (service: UserService) => {
            // mock
            tokenService.logIn.and.returnValue(of(new Token(dummyToken)));

            service.logIn("Ms. Jackson", "I am for real").subscribe(() => {
                service.logOut();
                expect(service.getLoggedInUser()).toBeNull();
                expect(storage.store).toHaveBeenCalled();
                expect(storage.clear).toHaveBeenCalled();
                done();
            });
        })();
    });


});
