import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PageAgreementComponent} from './page-agreement.component';

describe('PageAgreementComponent', () => {
    let component: PageAgreementComponent;
    let fixture: ComponentFixture<PageAgreementComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PageAgreementComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PageAgreementComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
