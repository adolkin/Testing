import { ValueService } from "./value.service";
import { TestBed, async, fakeAsync, tick } from "@angular/core/testing";

export class NotProvided extends ValueService { /* example below */ }

describe('ValueService with TestBed', () => {

  let service: ValueService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [ValueService] });
    service = TestBed.get(ValueService);
  });

  it('should use ValueService', () => {
    service = TestBed.get(ValueService);
    expect(service.getValue()).toBe('real value');
  });

  it('can inject a default value when service is not provided', () => {
    service = TestBed.get(NotProvided, null); // service is null
  });

  it('test should wait for ValueService.getPromiseValue', async(() => {
    service.getPromiseValue().then(
      value => expect(value).toBe('promise value')
    );
  }));

  it('test should wait for ValueService.getObservableValue', async(() => {
    service.getObservableValue().subscribe(
      value => expect(value).toBe('observable value')
    );
  }));

  // Must use done. See https://github.com/angular/angular/issues/10127
  it('test should wait for ValueService.getObservableDelayValue', (done: DoneFn) => {
    service.getObservableDelayValue().subscribe(value => {
      expect(value).toBe('observable delay value');
      done();
    });
  });

  it('should allow the use of fakeAsync', fakeAsync(() => {
    let value: any;
    service.getPromiseValue().then((val: any) => value = val);
    tick(); // Trigger JS engine cycle until all promises resolve.
    expect(value).toBe('promise value');
  }));
})