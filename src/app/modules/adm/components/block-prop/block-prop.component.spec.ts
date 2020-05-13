import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BlockPropComponent} from './block-prop.component';

describe('BlockPropComponent', () => {
    let component: BlockPropComponent;
    let fixture: ComponentFixture<BlockPropComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BlockPropComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BlockPropComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
