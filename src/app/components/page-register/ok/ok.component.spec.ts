import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PageRegisterOkComponent} from './ok.component';

describe('OkComponent', () => {
    let component: PageRegisterOkComponent;
    let fixture: ComponentFixture<PageRegisterOkComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PageRegisterOkComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PageRegisterOkComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
