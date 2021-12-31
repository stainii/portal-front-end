import {TestBed} from '@angular/core/testing';

import {RandomAdjectiveService} from './random-adjective.service';

describe('RandomAdjectiveGeneratorService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: RandomAdjectiveService = TestBed.inject(RandomAdjectiveService);
        expect(service).toBeTruthy();
    });

    it('should generate a random lowercase adjective', () => {
        const service: RandomAdjectiveService = TestBed.inject(RandomAdjectiveService);

        let adjective1 = service.lowercase();
        let adjective2 = service.lowercase();

        expect(adjective1).not.toBeNull();
        expect(adjective2).not.toBeNull();
        expect(adjective1).not.toEqual(adjective2);
    });

    it('should generate a random capitalized adjective', () => {
        const service: RandomAdjectiveService = TestBed.inject(RandomAdjectiveService);

        let adjective1 = service.capitalized();
        let adjective2 = service.capitalized();

        expect(adjective1).not.toBeNull();
        expect(adjective2).not.toBeNull();
        expect(adjective1).not.toEqual(adjective2);
        expect(adjective1.charAt(0)).toEqual(adjective1.charAt(0).toUpperCase());
        expect(adjective2.charAt(0)).toEqual(adjective2.charAt(0).toUpperCase());
    });
});
