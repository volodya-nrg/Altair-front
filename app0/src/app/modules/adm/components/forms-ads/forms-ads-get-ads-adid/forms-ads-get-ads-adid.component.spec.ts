import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FormsAdsGetAdsAdIDComponent} from './forms-ads-get-ads-adid.component';

describe('FormsAdsGetAdsAdIDComponent', () => {
    let component: FormsAdsGetAdsAdIDComponent;
    let fixture: ComponentFixture<FormsAdsGetAdsAdIDComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormsAdsGetAdsAdIDComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormsAdsGetAdsAdIDComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
