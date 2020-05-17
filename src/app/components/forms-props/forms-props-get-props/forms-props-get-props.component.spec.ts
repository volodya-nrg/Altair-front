import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FormsPropsGetPropsComponent} from './forms-props-get-props.component';

describe('FormsPropsGetPropsComponent', () => {
    let component: FormsPropsGetPropsComponent;
    let fixture: ComponentFixture<FormsPropsGetPropsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormsPropsGetPropsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormsPropsGetPropsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
