import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsPropsPostPutPropComponent } from './forms-props-post-put-prop.component';

describe('FormsPropsPostPutPropComponent', () => {
  let component: FormsPropsPostPutPropComponent;
  let fixture: ComponentFixture<FormsPropsPostPutPropComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormsPropsPostPutPropComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsPropsPostPutPropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
