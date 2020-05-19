import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DynamicPropComponent} from './dynamic-prop.component';

describe('DynamicPropComponent', () => {
    let component: DynamicPropComponent;
    let fixture: ComponentFixture<DynamicPropComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DynamicPropComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DynamicPropComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
