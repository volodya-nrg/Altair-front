import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FormsUsersDeleteUsersUserIDComponent} from './forms-users-delete-users-userid.component';

describe('FormsUsersDeleteUsersUserIDComponent', () => {
    let component: FormsUsersDeleteUsersUserIDComponent;
    let fixture: ComponentFixture<FormsUsersDeleteUsersUserIDComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormsUsersDeleteUsersUserIDComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormsUsersDeleteUsersUserIDComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
