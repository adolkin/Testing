import { Injectable } from "@angular/core";

import { Observable } from "rxjs/Observable";
import { map } from "rxjs/operators";
import { asyncData } from "../helpers/async-observable-helpers";

import { Hero } from "../../app/core/models/hero";
import { HeroService } from "../../app/core/services/hero.service";
import { getTestHeroes } from "../fake-data/test-heroes";

// re-export for tester convenience
export { Hero } from "../../app/core/models/hero";
export { HeroService } from "../../app/core/services/hero.service";
export { getTestHeroes } from "../fake-data/test-heroes";

@Injectable()
/**
 * FakeHeroService pretends to make real http requests.
 * implements only as much of HeroService as is actually consumed by the app
*/
export class TestHeroService extends HeroService {

  constructor() {
    super(null);
  }

  heroes = getTestHeroes();
  lastResult: Observable<any>; // result from last method call

  addHero(hero: Hero): Observable<Hero> {
    throw new Error('Method not implemented.');
  }

  deleteHero(hero: number | Hero): Observable<Hero> {
    throw new Error('Method not implemented.');
  }

  getHeroes(): Observable<Hero[]> {
    return this.lastResult = asyncData(this.heroes);
  }

  getHero(id: number | string): Observable<Hero> {
    if (typeof id === 'string') {
      id = parseInt(id as string, 10);
    }
    let hero = this.heroes.find(h => h.id === id);
    return this.lastResult = asyncData(hero);
  }

  updateHero(hero: Hero): Observable<Hero> {
    return this.lastResult = this.getHero(hero.id).pipe(
      map(h => {
        if (h) {
          return Object.assign(h, hero);
        }
        throw new Error(`Hero ${hero.id} not found`);
      })
    );
  }
}
