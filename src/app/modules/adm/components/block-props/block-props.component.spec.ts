import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockPropsComponent } from './block-props.component';

describe('BlockPropsComponent', () => {
  let component: BlockPropsComponent;
  let fixture: ComponentFixture<BlockPropsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockPropsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockPropsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
