import {inject, TestBed} from '@angular/core/testing';

import {RecurringTaskService} from './recurring-task.service';
import {HttpClientModule} from "@angular/common/http";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {RecurringTask} from "@app/recurring-tasks/recurring-task.model";

describe('RecurringTaskService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [RecurringTaskService],
            imports: [
                HttpClientModule,
                HttpClientTestingModule
            ]
        });
    });

    it('should be created', inject([RecurringTaskService], (service: RecurringTaskService) => {
        expect(service).toBeTruthy();
    }));

    it('should find all recurring tasks', inject([RecurringTaskService, HttpTestingController], (service: RecurringTaskService, backend: HttpTestingController) => {
        const deploymentName = "Housagotchi";
        service.findAll(deploymentName).subscribe();

        backend.expectOne({
            url: `/${deploymentName}/api/recurring-task/`,
            method: 'GET'
        });
    }));

    it('should delete a recurring task', inject([RecurringTaskService, HttpTestingController], (service: RecurringTaskService, backend: HttpTestingController) => {
        const deploymentName = "Housagotchi";
        const recurringTask: RecurringTask = {
            id: 12,
            name: 'test',
            minNumberOfDaysBetweenExecutions: 1,
            maxNumberOfDaysBetweenExecutions: 10,
            lastExecution: null
        };
        service.delete(deploymentName, recurringTask).subscribe();

        backend.expectOne({
            url: `/${deploymentName}/api/recurring-task/12/`,
            method: 'DELETE'
        });
    }));

    it('should update a recurring task', inject([RecurringTaskService, HttpTestingController], (service: RecurringTaskService, backend: HttpTestingController) => {
        const recurringTask: RecurringTask = {
            id: 12,
            name: 'test',
            minNumberOfDaysBetweenExecutions: 1,
            maxNumberOfDaysBetweenExecutions: 10,
            lastExecution: null
        };
        const deploymentName = "Housagotchi";

        service.update(deploymentName, recurringTask).subscribe();

        let request = backend.expectOne({
            url: `/${deploymentName}/api/recurring-task/12/`,
            method: 'PUT'
        });
        request.flush(recurringTask);
    }));

    it('should create a recurring task', inject([RecurringTaskService, HttpTestingController], (service: RecurringTaskService, backend: HttpTestingController) => {
        const recurringTask: RecurringTask = {
            id: 12,
            name: 'test',
            minNumberOfDaysBetweenExecutions: 1,
            maxNumberOfDaysBetweenExecutions: 10,
            lastExecution: null
        };
        const deploymentName = "Housagotchi";

        service.create(deploymentName, recurringTask).subscribe();

        let request = backend.expectOne({
            url: `/${deploymentName}/api/recurring-task/`,
            method: 'POST'
        });
        request.flush(recurringTask);
    }));
});
