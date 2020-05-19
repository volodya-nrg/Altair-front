import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FormsPagesAdAdidComponent} from './forms-pages-ad-adid.component';

describe('FormsPagesAdAdidComponent', () => {
    let component: FormsPagesAdAdidComponent;
    let fixture: ComponentFixture<FormsPagesAdAdidComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormsPagesAdAdidComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormsPagesAdAdidComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
