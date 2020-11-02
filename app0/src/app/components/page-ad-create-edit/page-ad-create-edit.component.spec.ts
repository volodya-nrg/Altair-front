import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PageAdCreateEditComponent} from './page-ad-create-edit.component';

describe('PageAdCreateEditComponent', () => {
    let component: PageAdCreateEditComponent;
    let fixture: ComponentFixture<PageAdCreateEditComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PageAdCreateEditComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PageAdCreateEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
