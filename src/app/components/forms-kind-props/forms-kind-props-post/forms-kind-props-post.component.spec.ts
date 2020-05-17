import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsKindPropsPostComponent } from './forms-kind-props-post.component';

describe('FormsKindPropsPostComponent', () => {
  let component: FormsKindPropsPostComponent;
  let fixture: ComponentFixture<FormsKindPropsPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormsKindPropsPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsKindPropsPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
