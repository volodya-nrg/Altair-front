import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FormsCatsPutCatsCatIDComponent} from './forms-cats-put-cats-catid.component';

describe('FormsCatsPutCatsCatIDComponent', () => {
    let component: FormsCatsPutCatsCatIDComponent;
    let fixture: ComponentFixture<FormsCatsPutCatsCatIDComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormsCatsPutCatsCatIDComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormsCatsPutCatsCatIDComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
