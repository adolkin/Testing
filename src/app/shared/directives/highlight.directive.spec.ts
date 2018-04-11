import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { HighlightDirective } from './highlight.directive';
import { newEvent } from '../../../testing/helpers/click-helpers';

@Component({
  template: `
  <h2 highlight="yellow">Something Yellow</h2>
  <h2 highlight>The Default (Gray)</h2>
  <h2>No Highlight</h2>
  <input #box [highlight]="box.value" value="cyan"/>`
})
class TestComponent { }

describe('HighlightDirective', () => {

  let fixture: ComponentFixture<TestComponent>;
  let des: DebugElement[];  // the three elements w/ the directive
  let bareH2: DebugElement; // the <h2> w/o the directive

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [HighlightDirective, TestComponent]
    })
      .createComponent(TestComponent);

    fixture.detectChanges(); // initial binding

    // all elements with an attached HighlightDirective
    // The By.directive predicate is a great way to get the elements 
    // that have this directive when their element types are unknown.
    des = fixture.debugElement.queryAll(By.directive(HighlightDirective));

    // the h2 without the HighlightDirective
    // The :not pseudo-class in By.css('h2:not([highlight])') 
    // helps find <h2> elements that do not have the directive. 
    // By.css('*:not([highlight])') finds any element that does not have the directive.
    bareH2 = fixture.debugElement.query(By.css('h2:not([highlight])'));
  });

  // color tests
  it('should have three highlighted elements', () => {
    expect(des.length).toBe(3);
  });

  it('should color 1st <h2> background "yellow"', () => {
    // DebugElement.styles affords access to element styles even in the absence of a real browser, 
    // thanks to the DebugElement abstraction. 
    // But feel free to exploit the nativeElement when that seems easier or more clear than the abstraction.
    const bgColor = des[0].nativeElement.style.backgroundColor;
    expect(bgColor).toBe('yellow');
  });

  it('should color 2nd <h2> background w/ default color', () => {
    // Angular adds a directive to the injector of the element to which it is applied. 
    // The test for the default color uses the injector of the second <h2> to get its HighlightDirective instance and its defaultColor
    const dir = des[1].injector.get(HighlightDirective) as HighlightDirective;
    const bgColor = des[1].nativeElement.style.backgroundColor;
    expect(bgColor).toBe(dir.defaultColor);
  });

  it('should bind <input> background to value color', () => {
    // easier to work with nativeElement
    const input = des[2].nativeElement as HTMLInputElement;
    expect(input.style.backgroundColor).toBe('cyan', 'initial backgroundColor');

    // dispatch a DOM event so that Angular responds to the input value change.
    input.value = 'green';
    input.dispatchEvent(newEvent('input'));
    fixture.detectChanges();

    expect(input.style.backgroundColor).toBe('green', 'changed backgroundColor');
  });


  it('bare <h2> should not have a customProperty', () => {
    // DebugElement.properties affords access to the artificial custom property that is set by the directive.
    expect(bareH2.properties['customProperty']).toBeUndefined();
  });

  // Removed on 12/02/2016 when ceased public discussion of the `Renderer`. Revive in future?
  // // customProperty tests
  // it('all highlighted elements should have a true customProperty', () => {
  //   const allTrue = des.map(de => !!de.properties['customProperty']).every(v => v === true);
  //   expect(allTrue).toBe(true);
  // });

  // injected directive
  // attached HighlightDirective can be injected
  it('can inject `HighlightDirective` in 1st <h2>', () => {
    const dir = des[0].injector.get(HighlightDirective);
    expect(dir).toBeTruthy();
  });

  it('cannot inject `HighlightDirective` in 3rd <h2>', () => {
    const dir = bareH2.injector.get(HighlightDirective, null);
    expect(dir).toBe(null);
  });

  // DebugElement.providerTokens
  // attached HighlightDirective should be listed in the providerTokens
  it('should have `HighlightDirective` in 1st <h2> providerTokens', () => {
    expect(des[0].providerTokens).toContain(HighlightDirective);
  });

  it('should not have `HighlightDirective` in 3rd <h2> providerTokens', () => {
    expect(bareH2.providerTokens).not.toContain(HighlightDirective);
  });
});
