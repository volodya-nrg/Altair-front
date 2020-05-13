import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FormsProfileComponent} from './forms-profile.component';

describe('FormsProfileComponent', () => {
    let component: FormsProfileComponent;
    let fixture: ComponentFixture<FormsProfileComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormsProfileComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormsProfileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
