import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FormsPagesComponent} from './forms-pages.component';

describe('FormsPagesComponent', () => {
    let component: FormsPagesComponent;
    let fixture: ComponentFixture<FormsPagesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormsPagesComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormsPagesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
