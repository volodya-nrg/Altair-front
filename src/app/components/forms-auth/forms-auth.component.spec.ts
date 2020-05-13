import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FormsAuthComponent} from './auth.component';

describe('AuthComponent', () => {
    let component: FormsAuthComponent;
    let fixture: ComponentFixture<FormsAuthComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormsAuthComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormsAuthComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
