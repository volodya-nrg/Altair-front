import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FormsUsersDeleteUsersUseridComponent} from './forms-users-delete-users-userid.component';

describe('FormsUsersDeleteUsersUseridComponent', () => {
    let component: FormsUsersDeleteUsersUseridComponent;
    let fixture: ComponentFixture<FormsUsersDeleteUsersUseridComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormsUsersDeleteUsersUseridComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormsUsersDeleteUsersUseridComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
