import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsKindPropsGetAllComponent } from './forms-kind-props-get-all.component';

describe('FormsKindPropsGetAllComponent', () => {
  let component: FormsKindPropsGetAllComponent;
  let fixture: ComponentFixture<FormsKindPropsGetAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormsKindPropsGetAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsKindPropsGetAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
