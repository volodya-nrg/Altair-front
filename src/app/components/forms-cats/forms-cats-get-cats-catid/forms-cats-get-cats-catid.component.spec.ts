import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsCatsGetCatsCatidComponent } from './forms-cats-get-cats-catid.component';

describe('FormsCatsGetCatsCatidComponent', () => {
  let component: FormsCatsGetCatsCatidComponent;
  let fixture: ComponentFixture<FormsCatsGetCatsCatidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormsCatsGetCatsCatidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsCatsGetCatsCatidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
