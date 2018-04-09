import { Injectable } from "@angular/core";

import { of } from 'rxjs/observable/of';
import { delay } from 'rxjs/operators';

////////// Services ///////////////
@Injectable()
export class ValueService {
  protected value = 'real value';

  getValue() { return this.value; }
  setValue(value: string) { this.value = value; }

  getObservableValue() { return of('observable value'); }

  getPromiseValue() { return Promise.resolve('promise value'); }

  getObservableDelayValue() {
    return of('observable delay value').pipe(delay(10));
  }
}

@Injectable()
export class MasterService {
  constructor(private masterService: ValueService) { }
  getValue() { return this.masterService.getValue(); }
}
