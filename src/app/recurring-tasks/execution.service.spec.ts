import {getTestBed, inject, TestBed} from '@angular/core/testing';

import {ExecutionService} from './execution.service';
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import moment from "moment";
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ExecutionService', () => {
    let injector: TestBed;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
    imports: [],
    providers: [ExecutionService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
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
        const deploymentName = "Housagotchi";
        service.addExecution(deploymentName, execution).subscribe();

        const req = httpMock.expectOne(`/api/${deploymentName}/api/recurring-task/100/execution/`);
        expect(req.request.method).toBe("POST");
        req.flush({date: "2011-10-31T00:00:00"});
    }));
});
