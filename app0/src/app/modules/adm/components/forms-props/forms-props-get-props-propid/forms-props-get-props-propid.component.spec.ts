import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsPropsGetPropsPropIDComponent} from './forms-props-get-props-propid.component';

describe('FormsPropsGetPropsPropIDComponent', () => {
    let component: FormsPropsGetPropsPropIDComponent;
    let fixture: ComponentFixture<FormsPropsGetPropsPropIDComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormsPropsGetPropsPropIDComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormsPropsGetPropsPropIDComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
