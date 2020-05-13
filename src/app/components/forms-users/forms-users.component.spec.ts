import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FormsUsersComponent} from './forms-users.component';

describe('FormsUsersComponent', () => {
    let component: FormsUsersComponent;
    let fixture: ComponentFixture<FormsUsersComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormsUsersComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormsUsersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
