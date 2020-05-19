import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FormsAdsPutAdsAdidComponent} from './forms-ads-put-ads-adid.component';

describe('FormsAdsPutAdsAdidComponent', () => {
    let component: FormsAdsPutAdsAdidComponent;
    let fixture: ComponentFixture<FormsAdsPutAdsAdidComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormsAdsPutAdsAdidComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormsAdsPutAdsAdidComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
