import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { HeroService } from './../core/services/hero.service';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { DebugElement } from '@angular/core';

class RouterStub {
  navigateByUrl(url: string) { return url; }
}

describe('DashboardComponent', () => {
  let comp: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let heroEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      providers: [
        { provide: HeroService, useClass: HeroService }, // F
        { provide: Router, useClass: RouterStub }
      ]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(DashboardComponent);
        comp = fixture.componentInstance;

        // get first <dashboard-hero> DebugElement
        heroEl = fixture.debugElement.query(By.css('dashboard-hero'));
        heroEl.triggerEventHandler('selected', comp.heroes[0]);
        fixture.detectChanges();
      });
  }));


  it('should NOT have heroes before ngOnInit', () => {
    expect(comp.heroes.length).toBe(0,
      'should not have heroes before ngOnInit');
  });

  // it('should tell ROUTER to navigate when hero clicked',
  //   inject([Router], (router: Router) => { // ...

  //     const spy = spyOn(router, 'navigateByUrl');

  //     // heroClick(); // trigger click on first inner <div class="hero">

  //     // args passed to router.navigateByUrl()
  //     const navArgs = spy.calls.first().args[0];

  //     // expecting to navigate to id of the component's first hero
  //     const id = comp.heroes[0].id;
  //     expect(navArgs).toBe('/heroes/' + id,
  //       'should nav to HeroDetail for first hero');
  //   }));
})
