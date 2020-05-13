import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FormsSearchComponent} from './forms-search.component';

describe('FormsSearchComponent', () => {
    let component: FormsSearchComponent;
    let fixture: ComponentFixture<FormsSearchComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormsSearchComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormsSearchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
