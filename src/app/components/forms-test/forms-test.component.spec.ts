import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsTestComponent } from './forms-test.component';

describe('FormsTestComponent', () => {
  let component: FormsTestComponent;
  let fixture: ComponentFixture<FormsTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormsTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
