import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAdSlugComponent } from './page-ad-slug.component';

describe('PageAdSlugComponent', () => {
  let component: PageAdSlugComponent;
  let fixture: ComponentFixture<PageAdSlugComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageAdSlugComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageAdSlugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
