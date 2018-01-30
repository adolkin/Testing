import { TwainService } from './../../core/services/twain.service';
import { By } from '@angular/platform-browser';
import { async, fakeAsync, ComponentFixture, TestBed, tick } from '@angular/core/testing';

import { TwainComponent } from './twain.component';
import { DebugElement } from '@angular/core';


describe('TwainComponent', () => {
  let component: TwainComponent;
  let fixture: ComponentFixture<TwainComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let spy: jasmine.Spy;
  let twainService: TwainService; // the actually injected service

  const testQuote = 'Test Quote';

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TwainComponent],
      providers: [TwainService],
    });

    fixture = TestBed.createComponent(TwainComponent);
    component = fixture.componentInstance;

    // TwainService actually injected into the component
    twainService = fixture.debugElement.injector.get(TwainService);

    // Instead of creating a stubbed service object, it injects the real service (see the testing module providers) 
    // and replaces the critical getQuote method with a Jasmine spy.
    // The spy is designed such that any call to getQuote receives an immediately resolved promise with a test quote. 
    //The spy bypasses the actual getQuote method and therefore does not contact the server.
    spy = spyOn(twainService, 'getQuote')
      .and.returnValue(Promise.resolve(testQuote));

    // Get the Twain quote element by CSS selector (e.g., by class name)
    de = fixture.debugElement.query(By.css('.twain'));
    el = de.nativeElement;
  });

  it('should not show quote before OnInit', () => {
    expect(el.textContent).toBe('', 'nothing displayed');
    expect(spy.calls.any()).toBe(false, 'getQuote not yet called');
  });

  it('should still not show quote after component initialized', () => {
    fixture.detectChanges();
    // getQuote service is async => still has not returned with quote
    expect(el.textContent).toBe('...', 'no quote yet');
    expect(spy.calls.any()).toBe(true, 'getQuote called');
  });

  // The async function is one of the Angular testing utilities. 
  // It simplifies coding of asynchronous tests by arranging for the tester's code to run in a special async test zone
  it('should show quote after getQuote promise (async)', async(() => {
    fixture.detectChanges();
    
    // The ComponentFixture.whenStable method returns its own promise,
    //  which resolves when the getQuote promise finishes. 
    fixture.whenStable().then(() => { // wait for async getQuote
      // Then the test resumes and kicks off another round of change detection (fixture.detectChanges), 
      // which tells Angular to update the DOM with the quote. 
      fixture.detectChanges();       
      expect(el.textContent).toBe(testQuote);
    });
  }));

  // The fakeAsync function is another of the Angular testing utilities. 
  // Like async, it takes a parameterless function and returns a function 
  // that becomes the argument to the Jasmine it call.
  // The principle advantage of fakeAsync over async is that the test appears to be synchronous. 
  // There is no then(...) to disrupt the visible flow of control.
  // There are limitations. For example, you cannot make an XHR call from within a fakeAsync.
  it('should show quote after getQuote promise (fakeAsync)', fakeAsync(() => {
    fixture.detectChanges();

    // You can only call tick() within a fakeAsync body.
    // Calling tick() simulates the passage of time until all pending asynchronous activities finish,
    // including the resolution of the getQuote promise in this test case.
    // It returns nothing. There is no promise to wait for. 
    tick();                  // wait for async getQuote
    fixture.detectChanges(); // update view with quote
    expect(el.textContent).toBe(testQuote);
  }));
  
  // You can still pass it a function that takes a done callback. 
  // Now you are responsible for chaining promises, handling errors, and calling done at the appropriate moment.
  // Writing test functions with done, while more cumbersome than async and fakeAsync, 
  // is a viable and occasionally necessary technique. For example, 
  // you can't call async or fakeAsync when testing code that involves the intervalTimer, 
  // as is common when testing async Observable methods.
  it('should show quote after getQuote promise (done)', (done: any) => {
    fixture.detectChanges();
  
    // get the spy promise and wait for it to resolve
    spy.calls.mostRecent().returnValue.then(() => {
      fixture.detectChanges(); // update view with quote
      expect(el.textContent).toBe(testQuote);
      done();
    });
  });
});
