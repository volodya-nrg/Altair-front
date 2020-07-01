import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FormsKindPropsGetOneComponent} from './forms-kind-props-get-one.component';

describe('FormsKindPropsGetOneComponent', () => {
    let component: FormsKindPropsGetOneComponent;
    let fixture: ComponentFixture<FormsKindPropsGetOneComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormsKindPropsGetOneComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormsKindPropsGetOneComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
