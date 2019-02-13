import {getTestBed, inject, TestBed} from '@angular/core/testing';

import {ExecutionService} from './execution.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {environment} from "@env/environment";
import moment = require("moment");

describe('ExecutionService', () => {
    let injector: TestBed;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ExecutionService],
            imports: [
                HttpClientTestingModule
            ]
        });
        injector = getTestBed();
        httpMock = injector.get(HttpTestingController);
    });

    it('should be created', inject([ExecutionService], (service: ExecutionService) => {
        expect(service).toBeTruthy();
    }));

    it('should add an execution', inject([ExecutionService], (service: ExecutionService) => {
        const execution = {
            recurringTaskId: 100,
            date: moment("2011-10-31", "YYYY-MM-DD")
        };
        service.addExecution(execution).subscribe();

        const req = httpMock.expectOne(`${environment.apiBaseUrl}housagotchi/api/recurring-task/100/execution/`);
        expect(req.request.method).toBe("POST");
        req.flush({ date: "2011-10-31T00:00:00" });
    }));
});
