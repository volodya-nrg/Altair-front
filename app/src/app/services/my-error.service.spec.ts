import {TestBed} from '@angular/core/testing';

import {MyErrorService} from './my-error.service';

describe('MyErrorService', () => {
    let service: MyErrorService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(MyErrorService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
