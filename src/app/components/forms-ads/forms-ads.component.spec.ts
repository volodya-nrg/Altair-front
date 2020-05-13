import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FormsAdsComponent} from './ads.component';

describe('AdsComponent', () => {
    let component: FormsAdsComponent;
    let fixture: ComponentFixture<FormsAdsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormsAdsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormsAdsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
