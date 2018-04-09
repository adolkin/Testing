import { ValueService, MasterService } from "./demo";

///////// Fakes /////////
export class FakeValueService extends ValueService {
  value = 'faked service value';
}

describe('demo (no TestBed):', () => {

  // Straight Jasmine testing without Angular's testing support
  describe('ValueService', () => {
    let service: ValueService;
    beforeEach(() => { service = new ValueService(); });

    it('#getValue should return real value', () => {
      expect(service.getValue()).toBe('real value');
    });

    it('#getObservableValue should return value from observable',
      (done: DoneFn) => {
        service.getObservableValue().subscribe(value => {
          expect(value).toBe('observable value');
          done();
        });
      });

    it('#getPromiseValue should return value from a promise',
      (done: DoneFn) => {
        service.getPromiseValue().then(value => {
          expect(value).toBe('promise value');
          done();
        });
      });
  });

  // MasterService requires injection of a ValueService
  describe('MasterService without Angular testing support', () => {
    let masterService: MasterService;

    it('#getValue should return real value from the real service', () => {
      masterService = new MasterService(new ValueService());
      expect(masterService.getValue()).toBe('real value');
    });

    it('#getValue should return faked value from a fakeService', () => {
      masterService = new MasterService(new FakeValueService());
      expect(masterService.getValue()).toBe('faked service value');
    });

    it('#getValue should return faked value from a fake object', () => {
      const fake = { getValue: () => 'fake value' };
      masterService = new MasterService(fake as ValueService);
      expect(masterService.getValue()).toBe('fake value');
    });

    it('#getValue should return stubbed value from a spy', () => {
      // create `getValue` spy on an object representing the ValueService
      const valueServiceSpy =
        jasmine.createSpyObj('ValueService', ['getValue']);

      // set the value to return when the `getValue` spy is called.
      const stubValue = 'stub value';
      valueServiceSpy.getValue.and.returnValue(stubValue);

      masterService = new MasterService(valueServiceSpy);

      expect(masterService.getValue())
        .toBe(stubValue, 'service returned stub value');
      expect(valueServiceSpy.getValue.calls.count())
        .toBe(1, 'spy method was called once');
      expect(valueServiceSpy.getValue.calls.mostRecent().returnValue)
        .toBe(stubValue);
    });
  });
});