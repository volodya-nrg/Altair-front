import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FormsPropsDeletePropsPropidComponent} from './forms-props-delete-props-propid.component';

describe('FormsPropsDeletePropsPropidComponent', () => {
    let component: FormsPropsDeletePropsPropidComponent;
    let fixture: ComponentFixture<FormsPropsDeletePropsPropidComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormsPropsDeletePropsPropidComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormsPropsDeletePropsPropidComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
