import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FormsPropsComponent} from './forms-props.component';

describe('FormsPropsComponent', () => {
    let component: FormsPropsComponent;
    let fixture: ComponentFixture<FormsPropsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormsPropsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormsPropsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
