import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FormsPropsGetPropsPropidComponent} from './forms-props-get-props-propid.component';

describe('FormsPropsGetPropsPropidComponent', () => {
    let component: FormsPropsGetPropsPropidComponent;
    let fixture: ComponentFixture<FormsPropsGetPropsPropidComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormsPropsGetPropsPropidComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormsPropsGetPropsPropidComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
