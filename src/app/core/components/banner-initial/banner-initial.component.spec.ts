import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerInitialComponent } from './banner-initial.component';

describe('BannerInitialComponent', () => {
  let component: BannerInitialComponent;
  let fixture: ComponentFixture<BannerInitialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerInitialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerInitialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
