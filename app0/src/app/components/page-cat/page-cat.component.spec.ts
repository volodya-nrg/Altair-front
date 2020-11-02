import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PageCatComponent} from './page-cat.component';

describe('PageCatComponent', () => {
    let component: PageCatComponent;
    let fixture: ComponentFixture<PageCatComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PageCatComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PageCatComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
