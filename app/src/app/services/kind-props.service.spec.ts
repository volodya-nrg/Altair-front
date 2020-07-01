import {TestBed} from '@angular/core/testing';

import {KindPropsService} from './kind-props.service';

describe('KindPropsService', () => {
    let service: KindPropsService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(KindPropsService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
