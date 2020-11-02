import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FormsUsersPutUsersUseridComponent} from './forms-users-put-users-userid.component';

describe('FormsUsersPutUsersUseridComponent', () => {
    let component: FormsUsersPutUsersUseridComponent;
    let fixture: ComponentFixture<FormsUsersPutUsersUseridComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormsUsersPutUsersUseridComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormsUsersPutUsersUseridComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
