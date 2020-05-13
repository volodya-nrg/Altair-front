import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FormsKindPropsComponent} from './forms-kind-props.component';

describe('FormsKindPropsComponent', () => {
    let component: FormsKindPropsComponent;
    let fixture: ComponentFixture<FormsKindPropsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormsKindPropsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormsKindPropsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
