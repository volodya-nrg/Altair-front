import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PageProfileAdsComponent} from './ads.component';

describe('AdsComponent', () => {
    let component: PageProfileAdsComponent;
    let fixture: ComponentFixture<PageProfileAdsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PageProfileAdsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PageProfileAdsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
