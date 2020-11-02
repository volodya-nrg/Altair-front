import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FormsCatsDeleteCatsCatIDComponent} from './forms-cats-delete-cats-catid.component';

describe('FormsCatsDeleteCatsCatIDComponent', () => {
    let component: FormsCatsDeleteCatsCatIDComponent;
    let fixture: ComponentFixture<FormsCatsDeleteCatsCatIDComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormsCatsDeleteCatsCatIDComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormsCatsDeleteCatsCatIDComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
