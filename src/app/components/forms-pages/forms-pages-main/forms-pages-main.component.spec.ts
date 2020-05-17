import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FormsPagesMainComponent} from './forms-pages-main.component';

describe('FormsPagesMainComponent', () => {
    let component: FormsPagesMainComponent;
    let fixture: ComponentFixture<FormsPagesMainComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormsPagesMainComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormsPagesMainComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
