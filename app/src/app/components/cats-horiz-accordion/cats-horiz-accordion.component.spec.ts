import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CatsHorizAccordionComponent} from './cats-horiz-accordion.component';

describe('CatsHorizAccorditionComponent', () => {
    let component: CatsHorizAccordionComponent;
    let fixture: ComponentFixture<CatsHorizAccordionComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CatsHorizAccordionComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CatsHorizAccordionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
