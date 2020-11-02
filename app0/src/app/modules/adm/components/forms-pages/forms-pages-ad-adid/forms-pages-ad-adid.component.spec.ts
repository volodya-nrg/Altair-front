import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FormsPagesAdAdIDComponent} from './forms-pages-ad-adid.component';

describe('FormsPagesAdAdIDComponent', () => {
    let component: FormsPagesAdAdIDComponent;
    let fixture: ComponentFixture<FormsPagesAdAdIDComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormsPagesAdAdIDComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormsPagesAdAdIDComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
