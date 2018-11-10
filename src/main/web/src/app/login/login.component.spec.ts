import {async, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from "@angular/router/testing";
import {LoginComponent} from "./login.component";
import {FormsModule} from "@angular/forms";
import {
    MatButton,
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatFormField,
    MatInput,
    MatRippleModule
} from "@angular/material";
import {UserService} from "../user.service";
import {of} from "rxjs";
import {Token} from "../token.model";
import {Router} from "@angular/router";

describe('LoginComponent', () => {
    const userService = jasmine.createSpyObj("UserService", ["logIn"]);
    const router = jasmine.createSpyObj("Router", ["navigate"]);
    const $event = jasmine.createSpyObj("Event", ["preventDefault"]);
    const dummyToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdGlqbiIsImF1dGhvcml0aWVzIjpbIlJPTEVfQURNSU4iXSwiaWF0IjoxNTQxNTI1NTE2LCJleHAiOjE1NDE2MTE5MTZ9.fao0Ytttr0Kcylc4I-Pa9k6Cm-42XTKPo1IDG0-R4mBhXufsYRtOi25sKeL6_PheKHenEL-OLxsdFGUX4-j9Kg";

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                LoginComponent,
                MatButton,
                MatCard,
                MatInput,
                MatCardHeader,
                MatCardContent,
                MatCardTitle,
                MatCardActions,
                MatFormField
            ], imports: [
                RouterTestingModule.withRoutes([]),
                FormsModule,
                MatRippleModule,
            ], providers: [
                {provide: UserService, useValue: userService},
                {provide: Router, useValue: router}
            ]
        }).compileComponents();
    }));

    it('should create', async(() => {
        const fixture = TestBed.createComponent(LoginComponent);
        const loginComponent = fixture.debugElement.componentInstance;
        expect(loginComponent).toBeTruthy();
    }));

    it('should log in', async(() => {
        //mock
        userService.logIn.and.returnValue(of(new Token(dummyToken)));

        // set up component
        const fixture = TestBed.createComponent(LoginComponent);
        const loginComponent = fixture.debugElement.componentInstance;
        loginComponent.username = "Cover me in rag and bones and sympathy";
        loginComponent.password = "Cause I don't want to get over you";

        // execute
        loginComponent.logIn($event);

        // verify
        expect(userService.logIn).toHaveBeenCalledWith("Cover me in rag and bones and sympathy", "Cause I don't want to get over you");
        expect(router.navigate).toHaveBeenCalledWith(["/notifications"]);
        expect($event.preventDefault).toHaveBeenCalled();
    }));
});
