import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FormsCatsPutCatsCatidComponent} from './forms-cats-put-cats-catid.component';

describe('FormsCatsPutCatsCatidComponent', () => {
    let component: FormsCatsPutCatsCatidComponent;
    let fixture: ComponentFixture<FormsCatsPutCatsCatidComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormsCatsPutCatsCatidComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormsCatsPutCatsCatidComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
