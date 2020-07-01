import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SocAuthComponent} from './soc-auth.component';

describe('SocAuthComponent', () => {
    let component: SocAuthComponent;
    let fixture: ComponentFixture<SocAuthComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SocAuthComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SocAuthComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
