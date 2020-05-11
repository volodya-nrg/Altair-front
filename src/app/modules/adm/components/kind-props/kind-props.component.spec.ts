import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {KindPropsComponent} from './kind-props.component';

describe('KindPropsComponent', () => {
    let component: KindPropsComponent;
    let fixture: ComponentFixture<KindPropsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [KindPropsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(KindPropsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
