import {inject, TestBed} from '@angular/core/testing';

import {HousagotchiReportService} from './housagotchi-report.service';
import {Mood} from "@app/housagotchi/mood.model";
import * as moment from "moment";

describe('HousagotchiReportService', () => {
    // data set
    const lateTask1 = {
        id: 1,
        name: "late task 1",
        minNumberOfDaysBetweenExecutions: 5,
        maxNumberOfDaysBetweenExecutions: 10,
        lastExecution: moment().add(-7, "days").toISOString()
    };

    const lateTask2 = {
        id: 2,
        name: "late task 2",
        minNumberOfDaysBetweenExecutions: 5,
        maxNumberOfDaysBetweenExecutions: 10,
        lastExecution: moment().add(-5, "days").toISOString()
    };

    const veryLateTask1 = {
        id: 3,
        name: "late task 1",
        minNumberOfDaysBetweenExecutions: 3,
        maxNumberOfDaysBetweenExecutions: 7,
        lastExecution: moment().add(-7, "days").toISOString()
    };

    const veryLateTask2 = {
        id: 4,
        name: "late task 2",
        minNumberOfDaysBetweenExecutions: 3,
        maxNumberOfDaysBetweenExecutions: 7,
        lastExecution: moment().add(-10, "days").toISOString()
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                HousagotchiReportService,
            ],
        });
    });

    it('should be created', inject([HousagotchiReportService], (service: HousagotchiReportService) => {
        expect(service).toBeTruthy();
    }));

    it('should assemble a report when there are no tasks', inject([HousagotchiReportService], (service: HousagotchiReportService) => {
        const report = service.assemble([])
        expect(report.lateTasks).toEqual([]);
        expect(report.veryLateTasks).toEqual([]);
        expect(report.mood).toEqual(Mood.HAPPY);
    }));

    it('should assemble a report when there are only late tasks', inject([HousagotchiReportService], (service: HousagotchiReportService) => {
        const report = service.assemble([lateTask1, lateTask2])
        expect(report.lateTasks).toEqual([lateTask1, lateTask2]);
        expect(report.veryLateTasks).toEqual([]);
        expect(report.mood).toEqual(Mood.ATTENTION);
    }));

    it('should assemble a report when there are only very late tasks', inject([HousagotchiReportService], (service: HousagotchiReportService) => {
        const report = service.assemble([veryLateTask1, veryLateTask2])
        expect(report.lateTasks).toEqual([]);
        expect(report.veryLateTasks).toEqual([veryLateTask1, veryLateTask2]);
        expect(report.mood).toEqual(Mood.MAD);
    }));

    it('should assemble a report when there are both late and very late tasks', inject([HousagotchiReportService], (service: HousagotchiReportService) => {
        const report = service.assemble([lateTask2, veryLateTask2]);
        expect(report.lateTasks).toEqual([lateTask2]);
        expect(report.veryLateTasks).toEqual([veryLateTask2]);
        expect(report.mood).toEqual(Mood.MAD);
    }));
});
