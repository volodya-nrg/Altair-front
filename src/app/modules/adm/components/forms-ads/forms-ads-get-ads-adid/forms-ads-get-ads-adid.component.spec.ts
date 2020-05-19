import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FormsAdsGetAdsAdidComponent} from './forms-ads-get-ads-adid.component';

describe('FormsAdsGetAdsAdidComponent', () => {
    let component: FormsAdsGetAdsAdidComponent;
    let fixture: ComponentFixture<FormsAdsGetAdsAdidComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormsAdsGetAdsAdidComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormsAdsGetAdsAdidComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
