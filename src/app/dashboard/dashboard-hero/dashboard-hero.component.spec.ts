// import { Hero } from './../../core/models/hero';
// import { By } from '@angular/platform-browser';
// import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// import { DashboardHeroComponent } from './dashboard-hero.component';
// import { DebugElement } from '@angular/core';
// import { click } from '../../../testing';

// describe('DashboardHeroComponent when tested directly', () => {
//   let comp: DashboardHeroComponent;
//   let fixture: ComponentFixture<DashboardHeroComponent>;
//   let expectedHero: Hero;
//   let heroEl: DebugElement;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [DashboardHeroComponent]
//     })
//       .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(DashboardHeroComponent);
//     comp = fixture.componentInstance;
//     heroEl = fixture.debugElement.query(By.css('.hero')); // find hero element

//     // pretend that it was wired to something that supplied a hero
//     expectedHero = new Hero(42, 'Test Name');
//     comp.hero = expectedHero;
//     fixture.detectChanges(); // trigger initial data binding
//   });

//   // It verifies that the hero name is propagated to template with a binding. 
//   // Because the template passes the hero name through the Angular UpperCasePipe, 
//   // the test must match the element value with the uppercased name:
//   it('should display hero name', () => {
//     const expectedPipedName = expectedHero.name.toUpperCase();
//     expect(heroEl.nativeElement.textContent).toContain(expectedPipedName);
//   });

//   // verifies click behavior. Clicking the hero should raise a selected event 
//   // that the host component (DashboardComponent presumably) can hear:
//   it('should raise selected event when clicked', () => {
//     let selectedHero: Hero;
//     // The component exposes an EventEmitter property. 
//     // The test subscribes to it just as the host component would do.
//     comp.selected.subscribe((hero: Hero) => selectedHero = hero);

//     // the test triggers a "click" event with a null event object.
//     heroEl.triggerEventHandler('click', null);

//     //click() tells the component's selected property to emit the hero object, 
//     //the test detects that value through its subscription to selected, 
//     //and the test should pass.
//     expect(selectedHero).toBe(expectedHero);
//   });

//   // using click helper method in testing folder
//   it('should raise selected event when clicked', () => {
//     let selectedHero: Hero;
//     comp.selected.subscribe((hero: Hero) => selectedHero = hero);

//     click(heroEl);   // triggerEventHandler helper
//     expect(selectedHero).toBe(expectedHero);
//   });
// });

// ////// Test Host Component //////
// import { Component } from '@angular/core';

// @Component({
//   template: `
//     <dashboard-hero  [hero]="hero"  (selected)="onSelected($event)"></dashboard-hero>`
// })
// class TestHostComponent {
//   hero = new Hero(42, 'Test Name');
//   selectedHero: Hero;
//   onSelected(hero: Hero) { this.selectedHero = hero; }
// }

// describe('DashboardHeroComponent when inside a test host', () => {
//   let testHost: TestHostComponent;
//   let fixture: ComponentFixture<TestHostComponent>;
//   let heroEl: DebugElement;

//   beforeEach( async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ DashboardHeroComponent, TestHostComponent ], // declare both
//     }).compileComponents();
//   }));

//   beforeEach(() => {
//     // create TestHostComponent instead of DashboardHeroComponent
//     fixture  = TestBed.createComponent(TestHostComponent);
//     testHost = fixture.componentInstance;
//     heroEl   = fixture.debugElement.query(By.css('.hero')); // find hero
//     fixture.detectChanges(); // trigger initial data binding
//   });

//   it('should display hero name', () => {
//     const expectedPipedName = testHost.hero.name.toUpperCase();
//     expect(heroEl.nativeElement.textContent).toContain(expectedPipedName);
//   });

//   it('should raise selected event when clicked', () => {
//     click(heroEl);
//     // selected hero should be the same data bound hero
//     expect(testHost.selectedHero).toBe(testHost.hero);
//   });
// });