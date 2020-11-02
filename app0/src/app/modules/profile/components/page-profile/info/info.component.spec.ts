import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PageProfileInfoComponent} from './info.component';

describe('InfoComponent', () => {
    let component: PageProfileInfoComponent;
    let fixture: ComponentFixture<PageProfileInfoComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PageProfileInfoComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PageProfileInfoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
