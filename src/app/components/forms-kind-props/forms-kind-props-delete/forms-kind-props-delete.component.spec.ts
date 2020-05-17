import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FormsKindPropsDeleteComponent} from './forms-kind-props-delete.component';

describe('FormsKindPropsDeleteComponent', () => {
    let component: FormsKindPropsDeleteComponent;
    let fixture: ComponentFixture<FormsKindPropsDeleteComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormsKindPropsDeleteComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormsKindPropsDeleteComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
