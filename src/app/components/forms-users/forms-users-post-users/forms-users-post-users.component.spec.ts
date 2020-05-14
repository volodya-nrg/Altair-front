import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FormsUsersPostUsersComponent} from './forms-users-post-users.component';

describe('FormsUsersPostUsersComponent', () => {
    let component: FormsUsersPostUsersComponent;
    let fixture: ComponentFixture<FormsUsersPostUsersComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormsUsersPostUsersComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormsUsersPostUsersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
