import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FormsCatsComponent} from './cats.component';

describe('CatsComponent', () => {
    let component: FormsCatsComponent;
    let fixture: ComponentFixture<FormsCatsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormsCatsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormsCatsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
