import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PageRecoverCheckHashComponent} from './check-hash.component';

describe('PageRecoverCheckHashComponent', () => {
    let component: PageRecoverCheckHashComponent;
    let fixture: ComponentFixture<PageRecoverCheckHashComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PageRecoverCheckHashComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PageRecoverCheckHashComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
