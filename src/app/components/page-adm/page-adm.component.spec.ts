import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PageAdmComponent} from './page-adm.component';

describe('PageAdmComponent', () => {
    let component: PageAdmComponent;
    let fixture: ComponentFixture<PageAdmComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PageAdmComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PageAdmComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
