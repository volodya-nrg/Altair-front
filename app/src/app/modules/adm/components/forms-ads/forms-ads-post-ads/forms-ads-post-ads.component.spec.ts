import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FormsAdsPostAdsComponent} from './forms-ads-post-ads.component';

describe('FormsAdsPostAdsComponent', () => {
    let component: FormsAdsPostAdsComponent;
    let fixture: ComponentFixture<FormsAdsPostAdsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormsAdsPostAdsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormsAdsPostAdsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
