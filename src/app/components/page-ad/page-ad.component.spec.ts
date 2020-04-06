import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAdComponent } from './page-ad-slug.component';

describe('PageAdSlugComponent', () => {
  let component: PageAdComponent;
  let fixture: ComponentFixture<PageAdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageAdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
