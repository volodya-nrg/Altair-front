import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SocShareComponent} from './soc-share.component';

describe('SocShareComponent', () => {
    let component: SocShareComponent;
    let fixture: ComponentFixture<SocShareComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SocShareComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SocShareComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
