import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FormsAdsGetAdsComponent} from './forms-ads-get-ads.component';

describe('FormsAdsGetAdsComponent', () => {
    let component: FormsAdsGetAdsComponent;
    let fixture: ComponentFixture<FormsAdsGetAdsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormsAdsGetAdsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormsAdsGetAdsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
