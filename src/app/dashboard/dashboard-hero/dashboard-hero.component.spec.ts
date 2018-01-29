import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardHeroComponent } from './dashboard-hero.component';

describe('DashboardHeroComponent', () => {
  let component: DashboardHeroComponent;
  let fixture: ComponentFixture<DashboardHeroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardHeroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
