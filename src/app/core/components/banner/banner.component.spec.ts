import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BannerComponent } from './banner.component';

describe('BannerComponent (TemplateUrl)', () => {
  let component: BannerComponent;
  let fixture: ComponentFixture<BannerComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  // The first beforeEach handles asynchronous compilation
  // to setup component with external template/css
  // async takes a parameterless function and returns a function 
  // which becomes the true argument to the beforeEach.
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BannerComponent], // declare the test component
    })
      // The TestBed.compileComponents method asynchronously compiles all 
      // the components configured in the testing module.
      .compileComponents();  // compile template and css
  }));

  // synchronous beforeEach containing the remaining setup steps follows the asynchronous beforeEach
  beforeEach(() => {
    fixture = TestBed.createComponent(BannerComponent);

    component = fixture.componentInstance; // BannerComponent test instance

    // query for the title <h1> by CSS element selector
    de = fixture.debugElement.query(By.css('h1'));
    el = de.nativeElement;
  });

  // You could move the synchronous code in the second beforeEach into a 
  // compileComponents().then(...) callback and write only one beforeEach.

  it('no title in the DOM until manually call `detectChanges`', () => {
    expect(el.textContent).toEqual('');
  });

  it('should display original title', () => {
    fixture.detectChanges();
    expect(el.textContent).toContain(component.title);
  });

  it('should display a different test title', () => {
    component.title = 'Test Title';
    fixture.detectChanges();
    expect(el.textContent).toContain('Test Title');
  });

});
