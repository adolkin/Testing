import { ValueService, MasterService } from "./demo";
import { TestBed, async, fakeAsync, tick } from "@angular/core/testing";

export class NotProvided extends ValueService { /* example below */ }

describe('demo (with TestBed):', () => {

  ////////  Service Tests  /////////////

  describe('ValueService', () => {

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

  describe('MasterService', () => {
    let masterService: MasterService;
    let valueServiceSpy: jasmine.SpyObj<ValueService>;

    beforeEach(() => {
      // The mock is a spy object.
      const spy = jasmine.createSpyObj('ValueService', ['getValue']);

      TestBed.configureTestingModule({
        // Provide both the service-to-test and its (spy) dependency
        providers: [
          MasterService,
          { provide: ValueService, useValue: spy }
        ]
      });
      // Inject both the service-to-test and its (spy) dependency
      masterService = TestBed.get(MasterService);
      valueServiceSpy = TestBed.get(ValueService);
    });

    it('#getValue should return stubbed value from a spy', () => {
      const stubValue = 'stub value';
      valueServiceSpy.getValue.and.returnValue(stubValue);

      expect(masterService.getValue())
        .toBe(stubValue, 'service returned stub value');
      expect(valueServiceSpy.getValue.calls.count())
        .toBe(1, 'spy method was called once');
      expect(valueServiceSpy.getValue.calls.mostRecent().returnValue)
        .toBe(stubValue);
    });
  });
})