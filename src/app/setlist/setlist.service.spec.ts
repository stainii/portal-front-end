import {inject, TestBed} from '@angular/core/testing';

import {SetlistService} from './setlist.service';
import * as moment from "moment";
import {Song} from "@app/setlist/song.model";

describe('SetlistService', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                SetlistService,
            ],
        });
    });

    it('should be created', inject([SetlistService], (service: SetlistService) => {
        expect(service).toBeTruthy();
    }));

    it('should put songs that should be played regularly first', inject([SetlistService], (service: SetlistService) => {
        const song1 = {
            id: 1,
            name: "song 1",
            minNumberOfDaysBetweenExecutions: 8,
            maxNumberOfDaysBetweenExecutions: 10,
            lastExecution: moment().add(-7, "days").toISOString()
        };

        const song2 = {
            id: 2,
            name: "song 2",
            minNumberOfDaysBetweenExecutions: 5,
            maxNumberOfDaysBetweenExecutions: 10,
            lastExecution: moment().add(-4, "days").toISOString()
        };

        const song3 = {
            id: 3,
            name: "song 3",
            minNumberOfDaysBetweenExecutions: 20,
            maxNumberOfDaysBetweenExecutions: 25,
            lastExecution: moment().add(-5, "days").toISOString()
        };

        const report = service.assemble([song1, song2, song3]);
        expect(report.songs).toEqual([new Song(2, "song 2", false), new Song(1, "song 1", false), new Song(3, "song 3", false)]);
    }));

    it('should put songs that should be played regularly first, taking max date in consideration if min dates are equal', inject([SetlistService], (service: SetlistService) => {
        const song1 = {
            id: 1,
            name: "song 1",
            minNumberOfDaysBetweenExecutions: 5,
            maxNumberOfDaysBetweenExecutions: 15,
            lastExecution: moment().add(-7, "days").toISOString()
        };

        const song2 = {
            id: 2,
            name: "song 2",
            minNumberOfDaysBetweenExecutions: 5,
            maxNumberOfDaysBetweenExecutions: 10,
            lastExecution: moment().add(-7, "days").toISOString()
        };

        const report = service.assemble([song1, song2]);
        expect(report.songs).toEqual([new Song(2, "song 2", true), new Song(1, "song 1", true)]);
    }));

    it('should mark overdue tasks', inject([SetlistService], (service: SetlistService) => {
        const song1 = {
            id: 1,
            name: "song 1",
            minNumberOfDaysBetweenExecutions: 5,
            maxNumberOfDaysBetweenExecutions: 15,
            lastExecution: moment().add(-7, "days").toISOString()
        };

        const song2 = {
            id: 2,
            name: "song 2",
            minNumberOfDaysBetweenExecutions: 5,
            maxNumberOfDaysBetweenExecutions: 10,
            lastExecution: moment().add(1, "days").toISOString()
        };

        const song3 = {
            id: 3,
            name: "song 3",
            minNumberOfDaysBetweenExecutions: 15,
            maxNumberOfDaysBetweenExecutions: 20,
            lastExecution: null
        };
        const report = service.assemble([song1, song2, song3]);
        expect(report.songs).toEqual([new Song(2, "song 2", false), new Song(1, "song 1", true), new Song(3, "song 3", false)]);
    }));

});
