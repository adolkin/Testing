import { Injectable } from "@angular/core";
import { ValueService } from "./value.service";

@Injectable()
export class MasterService {
  constructor(private masterService: ValueService) { }
  getValue() { return this.masterService.getValue(); }
}
