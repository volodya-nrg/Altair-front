import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FormsCatsGetCatsComponent} from './forms-cats-get-cats.component';

describe('FormsCatsGetCatsComponent', () => {
    let component: FormsCatsGetCatsComponent;
    let fixture: ComponentFixture<FormsCatsGetCatsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormsCatsGetCatsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormsCatsGetCatsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
