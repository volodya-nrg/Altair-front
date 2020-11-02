import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FormsPropsPostPropsComponent} from './forms-props-post-props.component';

describe('FormsPropsPostPropsComponent', () => {
    let component: FormsPropsPostPropsComponent;
    let fixture: ComponentFixture<FormsPropsPostPropsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormsPropsPostPropsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormsPropsPostPropsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
