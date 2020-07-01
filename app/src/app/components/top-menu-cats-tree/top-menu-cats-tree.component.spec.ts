import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TopMenuCatsTreeComponent} from './top-menu-cats-tree.component';

describe('TopMenuCatsTreeComponent', () => {
    let component: TopMenuCatsTreeComponent;
    let fixture: ComponentFixture<TopMenuCatsTreeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TopMenuCatsTreeComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TopMenuCatsTreeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
