import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FormsCatsPostCatsComponent} from './forms-cats-post-cats.component';

describe('FormsCatsPostCatsComponent', () => {
    let component: FormsCatsPostCatsComponent;
    let fixture: ComponentFixture<FormsCatsPostCatsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormsCatsPostCatsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormsCatsPostCatsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
