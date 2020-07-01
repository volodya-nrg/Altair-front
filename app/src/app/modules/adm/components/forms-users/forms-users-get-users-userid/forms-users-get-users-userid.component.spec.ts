import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FormsUsersGetUsersUseridComponent} from './forms-users-get-users-userid.component';

describe('FormsUsersGetUsersUseridComponent', () => {
    let component: FormsUsersGetUsersUseridComponent;
    let fixture: ComponentFixture<FormsUsersGetUsersUseridComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormsUsersGetUsersUseridComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormsUsersGetUsersUseridComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
