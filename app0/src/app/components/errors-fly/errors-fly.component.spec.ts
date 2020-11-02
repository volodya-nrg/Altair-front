import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorsFlyComponent } from './errors-fly.component';

describe('ErrorsFlyComponent', () => {
  let component: ErrorsFlyComponent;
  let fixture: ComponentFixture<ErrorsFlyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorsFlyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorsFlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
