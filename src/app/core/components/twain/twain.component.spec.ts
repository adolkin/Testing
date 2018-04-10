import { TwainComponent } from './twain.component';
import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { TwainService } from '../../services/twain.service';
import { of } from 'rxjs/observable/of';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

describe('TwainComponent', () => {
  let component: TwainComponent;
  let fixture: ComponentFixture<TwainComponent>;
  let getQuoteSpy: jasmine.Spy;
  let quoteEl: HTMLElement;
  let testQuote: string;

  // Helper function to get the error message element value
  // An *ngIf keeps it out of the DOM until there is an error
  const errorMessage = () => {
    const el = fixture.nativeElement.querySelector('.error');
    return el ? el.textContent : null;
  };

  beforeEach(() => {
    testQuote = 'Test Quote';

    // The spy is designed such that any call to getQuote receives an Observable 
    // with a test quote. Unlike the real getQuote() method, this spy bypasses the server 
    // and returns a synchronous Observable whose value is available immediately.


    // Create a fake TwainService object with a `getQuote()` spy
    const twainService = jasmine.createSpyObj('TwainService', ['getQuote']);
    // Make the spy return a synchronous Observable with the test data
    getQuoteSpy = twainService.getQuote.and.returnValue(of(testQuote));

    TestBed.configureTestingModule({
      declarations: [TwainComponent],
      providers: [
        { provide: TwainService, useValue: twainService }
      ]
    });

    fixture = TestBed.createComponent(TwainComponent);
    component = fixture.componentInstance;
    quoteEl = fixture.nativeElement.querySelector('.twain');
  });

  describe('when test with synchronous observable', () => {
    it('should not show quote before OnInit', () => {
      expect(quoteEl.textContent).toBe('', 'nothing displayed');
      expect(errorMessage()).toBeNull('should not show error element');
      expect(getQuoteSpy.calls.any()).toBe(false, 'getQuote not yet called');
    });

    // The quote would not be immediately available if the service were truly async.
    it('should show quote after component initialized', () => {
      fixture.detectChanges(); // onInit()

      // sync spy result shows testQuote immediately after init
      expect(quoteEl.textContent).toBe(testQuote);
      expect(getQuoteSpy.calls.any()).toBe(true, 'getQuote called');
    });


    // The error would not be immediately available if the service were truly async.
    // Use `fakeAsync` because the component error calls `setTimeout`
    it('should display error when TwainService fails', fakeAsync(() => {
      // tell spy to return an error observable
      getQuoteSpy.and.returnValue(
        new ErrorObservable('TwainService test failure'));

      fixture.detectChanges(); // onInit()
      // sync spy errors immediately after init

      tick(); // flush the component's setTimeout()

      fixture.detectChanges(); // update errorMessage within setTimeout()

      expect(errorMessage()).toMatch(/test failure/, 'should display error');
      expect(quoteEl.textContent).toBe('...', 'should show placeholder');
    }));
  });
})


// describe('TwainComponent', () => {
//   let component: TwainComponent;
//   let fixture: ComponentFixture<TwainComponent>;
//   let de: DebugElement;
//   let el: HTMLElement;
//   let spy: jasmine.Spy;
//   let twainService: TwainService; // the actually injected service

//   const testQuote = 'Test Quote';

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [TwainComponent],
//       providers: [TwainService],
//     });

//     fixture = TestBed.createComponent(TwainComponent);
//     component = fixture.componentInstance;

//     // TwainService actually injected into the component
//     twainService = fixture.debugElement.injector.get(TwainService);

//     // Instead of creating a stubbed service object, it injects the real service (see the testing module providers) 
//     // and replaces the critical getQuote method with a Jasmine spy.
//     // The spy is designed such that any call to getQuote receives an immediately resolved promise with a test quote. 
//     //The spy bypasses the actual getQuote method and therefore does not contact the server.
//     spy = spyOn(twainService, 'getQuote')
//       .and.returnValue(Promise.resolve(testQuote));

//     // Get the Twain quote element by CSS selector (e.g., by class name)
//     de = fixture.debugElement.query(By.css('.twain'));
//     el = de.nativeElement;
//   });

//   it('should not show quote before OnInit', () => {
//     expect(el.textContent).toBe('', 'nothing displayed');
//     expect(spy.calls.any()).toBe(false, 'getQuote not yet called');
//   });

//   it('should still not show quote after component initialized', () => {
//     fixture.detectChanges();
//     // getQuote service is async => still has not returned with quote
//     expect(el.textContent).toBe('...', 'no quote yet');
//     expect(spy.calls.any()).toBe(true, 'getQuote called');
//   });

//   // The async function is one of the Angular testing utilities. 
//   // It simplifies coding of asynchronous tests by arranging for the tester's code to run in a special async test zone
//   it('should show quote after getQuote promise (async)', async(() => {
//     fixture.detectChanges();

//     // The ComponentFixture.whenStable method returns its own promise,
//     //  which resolves when the getQuote promise finishes. 
//     fixture.whenStable().then(() => { // wait for async getQuote
//       // Then the test resumes and kicks off another round of change detection (fixture.detectChanges), 
//       // which tells Angular to update the DOM with the quote. 
//       fixture.detectChanges();       
//       expect(el.textContent).toBe(testQuote);
//     });
//   }));

//   // The fakeAsync function is another of the Angular testing utilities. 
//   // Like async, it takes a parameterless function and returns a function 
//   // that becomes the argument to the Jasmine it call.
//   // The principle advantage of fakeAsync over async is that the test appears to be synchronous. 
//   // There is no then(...) to disrupt the visible flow of control.
//   // There are limitations. For example, you cannot make an XHR call from within a fakeAsync.
//   it('should show quote after getQuote promise (fakeAsync)', fakeAsync(() => {
//     fixture.detectChanges();

//     // You can only call tick() within a fakeAsync body.
//     // Calling tick() simulates the passage of time until all pending asynchronous activities finish,
//     // including the resolution of the getQuote promise in this test case.
//     // It returns nothing. There is no promise to wait for. 
//     tick();                  // wait for async getQuote
//     fixture.detectChanges(); // update view with quote
//     expect(el.textContent).toBe(testQuote);
//   }));

//   // You can still pass it a function that takes a done callback. 
//   // Now you are responsible for chaining promises, handling errors, and calling done at the appropriate moment.
//   // Writing test functions with done, while more cumbersome than async and fakeAsync, 
//   // is a viable and occasionally necessary technique. For example, 
//   // you can't call async or fakeAsync when testing code that involves the intervalTimer, 
//   // as is common when testing async Observable methods.
//   it('should show quote after getQuote promise (done)', (done: any) => {
//     fixture.detectChanges();

//     // get the spy promise and wait for it to resolve
//     spy.calls.mostRecent().returnValue.then(() => {
//       fixture.detectChanges(); // update view with quote
//       expect(el.textContent).toBe(testQuote);
//       done();
//     });
//   });
// });
