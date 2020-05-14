import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FormsCatsDeleteCatsCatidComponent} from './forms-cats-delete-cats-catid.component';

describe('FormsCatsDeleteCatsCatidComponent', () => {
    let component: FormsCatsDeleteCatsCatidComponent;
    let fixture: ComponentFixture<FormsCatsDeleteCatsCatidComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormsCatsDeleteCatsCatidComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormsCatsDeleteCatsCatidComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
