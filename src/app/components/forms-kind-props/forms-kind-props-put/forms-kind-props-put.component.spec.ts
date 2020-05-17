import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsKindPropsPutComponent } from './forms-kind-props-put.component';

describe('FormsKindPropsPutComponent', () => {
  let component: FormsKindPropsPutComponent;
  let fixture: ComponentFixture<FormsKindPropsPutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormsKindPropsPutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsKindPropsPutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
