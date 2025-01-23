import {getTestBed, inject, TestBed} from '@angular/core/testing';

import {TokenService} from './token.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {Token} from "./token.model";
import {HttpHeaders} from "@angular/common/http";

describe('TokenService', () => {
    let injector: TestBed;
    let service: TokenService;
    let httpMock: HttpTestingController;
    const dummyToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdGlqbiIsImF1dGhvcml0aWVzIjpbIlJPTEVfQURNSU4iXSwiaWF0IjoxNTQxNTI1NTE2LCJleHAiOjE1NDE2MTE5MTZ9.fao0Ytttr0Kcylc4I-Pa9k6Cm-42XTKPo1IDG0-R4mBhXufsYRtOi25sKeL6_PheKHenEL-OLxsdFGUX4-j9Kg";

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [TokenService],
            imports: [HttpClientTestingModule]
        });
        injector = getTestBed();
        service = injector.get(TokenService);
        httpMock = injector.get(HttpTestingController);
    });

    // verify that there are no more requests
    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', inject([TokenService], (service: TokenService) => {
        expect(service).toBeTruthy();
    }));

    it('should log in', inject([TokenService], (service: TokenService) => {
        let expectedToken = new Token(dummyToken);

        service.logIn("Twenty one", "Pilots").subscribe(token => {
            expect(token).toEqual(expectedToken);
        });

        const req = httpMock.expectOne("/api/auth-service/auth/");
        expect(req.request.method).toBe("POST");
        req.flush({}, {headers: new HttpHeaders().append("Authorization", `Bearer ${dummyToken}`)});
    }));
});
