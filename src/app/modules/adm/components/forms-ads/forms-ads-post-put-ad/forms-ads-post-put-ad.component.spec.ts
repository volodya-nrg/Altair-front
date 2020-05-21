import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FormsAdsPostPutAdComponent} from './forms-ads-post-put-ad.component';

describe('FormsAdsPostPutAdComponent', () => {
    let component: FormsAdsPostPutAdComponent;
    let fixture: ComponentFixture<FormsAdsPostPutAdComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormsAdsPostPutAdComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormsAdsPostPutAdComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
