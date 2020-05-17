import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FormsSearchAdsComponent} from './forms-search-ads.component';

describe('FormsSearchAdsComponent', () => {
    let component: FormsSearchAdsComponent;
    let fixture: ComponentFixture<FormsSearchAdsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormsSearchAdsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormsSearchAdsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
