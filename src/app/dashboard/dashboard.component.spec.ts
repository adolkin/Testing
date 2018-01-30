import { Router } from '@angular/router';
import { HeroService } from './../core/services/hero.service';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';

class RouterStub {
  navigateByUrl(url: string) { return url; }
}

describe('DashboardComponent', () => {
  let comp: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HeroService, useClass: HeroService
         },
        { provide: Router, useClass: RouterStub }
      ]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(DashboardComponent);
        comp = fixture.componentInstance;
      });
  }));
  
  it('should tell ROUTER to navigate when hero clicked',
  inject([Router], (router: Router) => { // ...

  const spy = spyOn(router, 'navigateByUrl');

  // heroClick(); // trigger click on first inner <div class="hero">

  // args passed to router.navigateByUrl()
  const navArgs = spy.calls.first().args[0];

  // expecting to navigate to id of the component's first hero
  const id = comp.heroes[0].id;
  expect(navArgs).toBe('/heroes/' + id,
    'should nav to HeroDetail for first hero');
}));
})
