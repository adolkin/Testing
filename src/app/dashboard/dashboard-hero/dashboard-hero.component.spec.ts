import { Hero } from './../../core/models/hero';
import { By } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { click } from '../../../testing/helpers/click-helpers';

import { DashboardHeroComponent } from './dashboard-hero.component';
import { DebugElement } from '@angular/core';

describe('DashboardHeroComponent class only no TestBed', () => {
  it('raises the selected event when clicked', () => {
    const comp = new DashboardHeroComponent();
    const hero: Hero = { id: 42, name: 'Test' };
    comp.hero = hero;

    comp.selected.subscribe(selectedHero => expect(selectedHero).toBe(hero));
    comp.click();
  });
});

describe('DashboardHeroComponent when tested directly', () => {
  let comp: DashboardHeroComponent;
  let expectedHero: Hero;
  let fixture: ComponentFixture<DashboardHeroComponent>;
  let heroDe: DebugElement;
  let heroEl: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardHeroComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardHeroComponent);
    comp = fixture.componentInstance;

    // find the hero's DebugElement and element
    heroDe = fixture.debugElement.query(By.css('.hero'));
    heroEl = heroDe.nativeElement;

    // mock the hero supplied by the parent component
    expectedHero = { id: 42, name: 'Test Name' };

    // simulate the parent setting the input property with that hero
    comp.hero = expectedHero;

    // trigger initial data binding
    fixture.detectChanges();
  });


  // It verifies that the hero name is propagated to template with a binding. 
  // Because the template passes the hero name through the Angular UpperCasePipe, 
  // the test must match the element value with the uppercased name:
  it('should display hero name in uppercase', () => {
    const expectedPipedName = expectedHero.name.toUpperCase();
    expect(heroEl.textContent).toContain(expectedPipedName);
  });

  // verifies click behavior. Clicking the hero should raise a selected event 
  // that the host component (DashboardComponent presumably) can hear:
  it('should raise selected event when clicked', () => {
    let selectedHero: Hero;
    // The component exposes an EventEmitter property. 
    // The test subscribes to it just as the host component would do.
    comp.selected.subscribe((hero: Hero) => selectedHero = hero);

    // the test triggers a "click" event with a null event object.
    heroDe.triggerEventHandler('click', null);

    //click() tells the component's selected property to emit the hero object, 
    //the test detects that value through its subscription to selected, 
    //and the test should pass.
    expect(selectedHero).toBe(expectedHero);
  });

  it('should raise selected event when clicked (element.click)', () => {
    let selectedHero: Hero;
    comp.selected.subscribe((hero: Hero) => selectedHero = hero);

    heroEl.click();
    expect(selectedHero).toBe(expectedHero);
  });

  it('should raise selected event when clicked (click helper)', () => {
    let selectedHero: Hero;
    comp.selected.subscribe(hero => selectedHero = hero);

    click(heroDe); // click helper with DebugElement
    click(heroEl); // click helper with native element

    expect(selectedHero).toBe(expectedHero);
  });
});

////// Test Host Component //////
// This test host binds to DashboardHeroComponent as the DashboardComponent would 
// but without the noise of the Router, the HeroService, or the *ngFor repeater.
import { Component } from '@angular/core';

@Component({
  template: `
    <dashboard-hero
      [hero]="hero" (selected)="onSelected($event)">
    </dashboard-hero>`
})
class TestHostComponent {
  hero: Hero = { id: 42, name: 'Test Name' };
  selectedHero: Hero;
  onSelected(hero: Hero) { this.selectedHero = hero; }
}


describe('DashboardHeroComponent when inside a test host', () => {
  let testHost: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let heroEl: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardHeroComponent, TestHostComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    // create TestHostComponent instead of DashboardHeroComponent
    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    heroEl = fixture.nativeElement.querySelector('.hero');
    fixture.detectChanges(); // trigger initial data binding
  });

  it('should display hero name', () => {
    const expectedPipedName = testHost.hero.name.toUpperCase();
    expect(heroEl.textContent).toContain(expectedPipedName);
  });

  it('should raise selected event when clicked', () => {
    click(heroEl);
    // selected hero should be the same data bound hero
    expect(testHost.selectedHero).toBe(testHost.hero);
  });
});
