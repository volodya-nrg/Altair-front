import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FormsPropsDeletePropsPropIDComponent} from './forms-props-delete-props-propid.component';

describe('FormsPropsDeletePropsPropIDComponent', () => {
    let component: FormsPropsDeletePropsPropIDComponent;
    let fixture: ComponentFixture<FormsPropsDeletePropsPropIDComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormsPropsDeletePropsPropIDComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormsPropsDeletePropsPropIDComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
