import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FormsUsersGetUsersComponent} from './forms-users-get-users.component';

describe('FormsUsersGetUsersComponent', () => {
    let component: FormsUsersGetUsersComponent;
    let fixture: ComponentFixture<FormsUsersGetUsersComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormsUsersGetUsersComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormsUsersGetUsersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
