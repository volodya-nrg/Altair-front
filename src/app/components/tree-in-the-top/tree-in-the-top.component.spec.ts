import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeInTheTopComponent } from './tree-in-the-top.component';

describe('TreeInTheTopComponent', () => {
  let component: TreeInTheTopComponent;
  let fixture: ComponentFixture<TreeInTheTopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreeInTheTopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeInTheTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
