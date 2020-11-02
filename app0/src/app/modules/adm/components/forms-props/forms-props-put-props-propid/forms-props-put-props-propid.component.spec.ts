import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FormsPropsPutPropsPropidComponent} from './forms-props-put-props-propid.component';

describe('FormsPropsPutPropsPropidComponent', () => {
    let component: FormsPropsPutPropsPropidComponent;
    let fixture: ComponentFixture<FormsPropsPutPropsPropidComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormsPropsPutPropsPropidComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormsPropsPutPropsPropidComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
