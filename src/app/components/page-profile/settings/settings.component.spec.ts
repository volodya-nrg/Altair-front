import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PageProfileSettingsComponent} from './settings.component';

describe('SettingsComponent', () => {
    let component: PageProfileSettingsComponent;
    let fixture: ComponentFixture<PageProfileSettingsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PageProfileSettingsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PageProfileSettingsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
