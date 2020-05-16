import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DynamicPropsFullComponent} from './dynamic-props-full.component';

describe('DynamicPropsFullComponent', () => {
    let component: DynamicPropsFullComponent;
    let fixture: ComponentFixture<DynamicPropsFullComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DynamicPropsFullComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DynamicPropsFullComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
