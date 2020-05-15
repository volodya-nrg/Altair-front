import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FormsAdsDeleteAdsAdidComponent} from './forms-ads-delete-ads-adid.component';

describe('FormsAdsDeleteAdsAdidComponent', () => {
    let component: FormsAdsDeleteAdsAdidComponent;
    let fixture: ComponentFixture<FormsAdsDeleteAdsAdidComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormsAdsDeleteAdsAdidComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormsAdsDeleteAdsAdidComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
