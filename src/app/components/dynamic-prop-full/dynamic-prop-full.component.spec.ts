import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicPropFullComponent } from './dynamic-prop-full.component';

describe('DynamicPropFullComponent', () => {
  let component: DynamicPropFullComponent;
  let fixture: ComponentFixture<DynamicPropFullComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicPropFullComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicPropFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
