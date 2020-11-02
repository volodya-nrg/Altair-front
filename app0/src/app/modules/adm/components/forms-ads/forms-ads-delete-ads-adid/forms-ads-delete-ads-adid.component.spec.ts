import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FormsAdsDeleteAdsAdIDComponent} from './forms-ads-delete-ads-adid.component';

describe('FormsAdsDeleteAdsAdIDComponent', () => {
    let component: FormsAdsDeleteAdsAdIDComponent;
    let fixture: ComponentFixture<FormsAdsDeleteAdsAdIDComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormsAdsDeleteAdsAdIDComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormsAdsDeleteAdsAdIDComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
