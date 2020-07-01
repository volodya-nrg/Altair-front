import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PageCheckEmailThroughHashComponent} from './page-check-email-through-hash.component';

describe('PageCheckEmailThroughHashComponent', () => {
    let component: PageCheckEmailThroughHashComponent;
    let fixture: ComponentFixture<PageCheckEmailThroughHashComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PageCheckEmailThroughHashComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PageCheckEmailThroughHashComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
