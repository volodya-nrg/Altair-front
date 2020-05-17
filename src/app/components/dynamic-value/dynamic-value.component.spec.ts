import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DynamicValueComponent} from './dynamic-value.component';

describe('DynamicValueComponent', () => {
    let component: DynamicValueComponent;
    let fixture: ComponentFixture<DynamicValueComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DynamicValueComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DynamicValueComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
