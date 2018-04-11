
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { BannerExternalComponent } from './banner-external.component';

describe('BannerExternalComponent', () => {
  let component: BannerExternalComponent;
  let fixture: ComponentFixture<BannerExternalComponent>;
  let h1: HTMLElement;

  describe('Two beforeEach', () => {

    // The first beforeEach handles asynchronous compilation
    // to setup component with external template/css
    // async takes a parameterless function and returns a function 
    // which becomes the true argument to the beforeEach.
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [BannerExternalComponent], // declare the test component
      })
        // The TestBed.compileComponents method asynchronously compiles all 
        // the components configured in the testing module.
        // You must call compileComponents() within an asynchronous test function.
        .compileComponents();  // compile template and css
    }));

    // synchronous beforeEach containing the remaining setup steps follows the asynchronous beforeEach
    beforeEach(() => {
      fixture = TestBed.createComponent(BannerExternalComponent);

      component = fixture.componentInstance; // BannerExternalComponent test instance

      // query for the title <h1>
      h1 = fixture.nativeElement.querySelector('h1');
    });
    tests();
  })
  // You could move the synchronous code in the second beforeEach into a 
  // compileComponents().then(...) callback and write only one beforeEach.
  describe('One beforeEach', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [BannerExternalComponent],
      })
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(BannerExternalComponent);
          component = fixture.componentInstance;
          h1 = fixture.nativeElement.querySelector('h1');
        });
    }));

    tests();
  });

  function tests() {
    it('no title in the DOM until manually call `detectChanges`', () => {
      expect(h1.textContent).toEqual('');
    });

    it('should display original title', () => {
      fixture.detectChanges();
      expect(h1.textContent).toContain(component.title);
    });

    it('should display a different test title', () => {
      component.title = 'Test Title';
      fixture.detectChanges();
      expect(h1.textContent).toContain('Test Title');
    });
  }
});
