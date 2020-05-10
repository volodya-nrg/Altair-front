import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PageRecoverSenderComponent} from './sender.component';

describe('PageRecoverSenderComponent', () => {
    let component: PageRecoverSenderComponent;
    let fixture: ComponentFixture<PageRecoverSenderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PageRecoverSenderComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PageRecoverSenderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
