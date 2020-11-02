import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DynamicPropsComponent} from './dynamic-props.component';

describe('DynamicPropsComponent', () => {
    let component: DynamicPropsComponent;
    let fixture: ComponentFixture<DynamicPropsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DynamicPropsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DynamicPropsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
