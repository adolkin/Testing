// TestBed creates an Angular Testing module
import { ComponentFixture, TestBed } from '@angular/core/testing';
// The By class is an Angular testing utility that produces useful predicates. 
// Its By.css static method produces a standard CSS selector predicate 
// that filters the same way as a jQuery selector.
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BannerInlineComponent } from './banner-inline.component';

describe('BannerInlineComponent', () => {
  let component: BannerInlineComponent;
  // ComponentFixture is  a handle on the test environment surrounding the created component. 
  // The fixture provides access to the component instance itself and to the DebugElement, 
  // which is a handle on the component's DOM element
  let fixture: ComponentFixture<BannerInlineComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  // Call configureTestingModule within a beforeEach so that 
  // TestBed can reset itself to a base state before each test runs.
  beforeEach(() => {
    // configureTestingModule method produces the module environment for the class you want to test
    TestBed.configureTestingModule({
      declarations: [BannerInlineComponent], // declare the test component
      // The metadata lack imports because 
      // (a) the default testing module configuration already has what BannerComponent needs 
      // and (b) BannerComponent doesn't interact with any other components.
    });

    // The createComponent method closes the current TestBed instance to further configuration
    // The createComponent method returns a ComponentFixture
    fixture = TestBed.createComponent(BannerInlineComponent);

    component = fixture.componentInstance; // BannerComponent test instance

    // The query method takes a predicate function and searches the fixture's 
    // entire DOM tree for the first element that satisfies the predicate
    // The queryAll method returns an array of all DebugElements that satisfy the predicate.
    de = fixture.debugElement.query(By.css('h1')); // query for the title <h1> by CSS element selector

    // The setup assigns the DOM element from the DebugElement nativeElement property to el. 
    // The tests assert that el contains the expected title text
    el = de.nativeElement;
  });
  
  // Jasmine runs the beforeEach function before each of these tests

  // A predicate is a function that returns a boolean. 
  // A query predicate receives a DebugElement and returns true if the element meets the selection criteria.
  it('no title in the DOM until manually call `detectChanges`', () => {
    expect(el.textContent).toEqual('');
  });
  
  it('should display original title', () => {
    // Each test tells Angular when to perform change detection by calling fixture.detectChanges().
    // The TestBed.createComponent does not trigger change detection
    fixture.detectChanges();
    expect(el.textContent).toContain(component.title);
  });

  it('should display a different test title', () => {
    component.title = 'Test Title';
    fixture.detectChanges();
    expect(el.textContent).toContain('Test Title');
  });

});
