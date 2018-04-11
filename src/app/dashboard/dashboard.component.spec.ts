// import { By } from '@angular/platform-browser';
// import { Router } from '@angular/router';
// import { HeroService } from './../core/services/hero.service';
// import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

// import { DashboardComponent } from './dashboard.component';
// import { DebugElement } from '@angular/core';

// const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
// const heroServiceSpy = jasmine.createSpyObj('HeroService', ['getHeroes']);

// describe('DashboardComponent', () => {
//   let comp: DashboardComponent;
//   let fixture: ComponentFixture<DashboardComponent>;
//   let heroEl: DebugElement;
//   let router: Router;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [DashboardComponent],
//       providers: [
//         { provide: HeroService, useValue: heroServiceSpy },
//         { provide: Router, useValue: routerSpy }
//       ]
//     })
//       .compileComponents().then(() => {
//         fixture = TestBed.createComponent(DashboardComponent);
//         comp = fixture.componentInstance;

//         // get first <dashboard-hero> DebugElement
//         heroEl = fixture.debugElement.query(By.css('dashboard-hero'));
//         heroEl.triggerEventHandler('selected', comp.heroes[0]);
//         router = fixture.debugElement.injector.get(Router);
//         fixture.detectChanges();
//       });
//   }));
//   it('should NOT have heroes before ngOnInit', () => {
//     expect(comp.heroes.length).toBe(0,
//       'should not have heroes before ngOnInit');
//   });

//   it('should NOT have heroes immediately after ngOnInit', () => {
//     fixture.detectChanges(); // runs initial lifecycle hooks

//     expect(comp.heroes.length).toBe(0,
//       'should not have heroes until service promise resolves');
//   });
//   it('should tell ROUTER to navigate when hero clicked', () => {

//     heroClick(); // trigger click on first inner <div class="hero">

//     // args passed to router.navigateByUrl() spy
//     const spy = router.navigateByUrl as jasmine.Spy;
//     const navArgs = spy.calls.first().args[0];

//     // expecting to navigate to id of the component's first hero
//     const id = comp.heroes[0].id;
//     expect(navArgs).toBe('/heroes/' + id,
//       'should nav to HeroDetail for first hero');
//   });
// })
