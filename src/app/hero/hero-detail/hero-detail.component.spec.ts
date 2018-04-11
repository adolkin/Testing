import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroDetailComponent } from './hero-detail.component';
import { ActivatedRouteStub } from '../../../testing/helpers/activated-route-stub';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroService } from '../../core/services/hero.service';
import { Hero } from '../../core/models/hero';
import { getTestHeroes, TestHeroService } from '../../../testing/fake-services/test-hero.service';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';


// let activatedRoute: ActivatedRouteStub;
// let component: HeroDetailComponent;
// let fixture: ComponentFixture<HeroDetailComponent>;
// let page: Page;

// describe('HeroDetailComponent', () => {
//   const firstHero = getTestHeroes()[0];

//   beforeEach(async(() => {
//     const routerSpy = createRouterSpy();

//     TestBed.configureTestingModule({
//       imports: [FormsModule],
//       declarations: [HeroDetailComponent],
//       providers: [
//         { provide: ActivatedRoute, useValue: activatedRoute },
//         { provide: HeroService, useClass: TestHeroService },
//         { provide: Router, useValue: routerSpy },
//       ]
//     })
//       .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(HeroDetailComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   describe('when navigate to existing hero', () => {
//     let expectedHero: Hero;

//     beforeEach(async(() => {
//       expectedHero = firstHero;
//       activatedRoute.setParamMap({ id: expectedHero.id });
//       createComponent();
//     }));

//     it('should display that hero\'s name', () => {
//       expect(page.nameDisplay.textContent).toBe(expectedHero.name);
//     });

//   });

//   describe('when navigate to non-existent hero id', () => {
//     beforeEach(async(() => {
//       activatedRoute.setParamMap({ id: 99999 });
//       createComponent();
//     }));

//     it('should try to navigate back to hero list', () => {
//       expect(page.gotoListSpy.calls.any()).toBe(true, 'comp.gotoList called');
//       expect(page.navigateSpy.calls.any()).toBe(true, 'router.navigate called');
//     });
//   });

// });

// class Page {
//   // getter properties wait to query the DOM until called.
//   get buttons() { return this.queryAll<HTMLButtonElement>('button'); }
//   get saveBtn() { return this.buttons[0]; }
//   get cancelBtn() { return this.buttons[1]; }
//   get nameDisplay() { return this.query<HTMLElement>('span'); }
//   get nameInput() { return this.query<HTMLInputElement>('input'); }

//   gotoListSpy: jasmine.Spy;
//   navigateSpy: jasmine.Spy;

//   constructor(fixture: ComponentFixture<HeroDetailComponent>) {
//     // get the navigate spy from the injected router spy object
//     const routerSpy = <any>fixture.debugElement.injector.get(Router);
//     this.navigateSpy = routerSpy.navigate;

//     // spy on component's `gotoList()` method
//     const component = fixture.componentInstance;
//     this.gotoListSpy = spyOn(component, 'gotoList').and.callThrough();
//   }

//   //// query helpers ////
//   private query<T>(selector: string): T {
//     return fixture.nativeElement.querySelector(selector);
//   }

//   private queryAll<T>(selector: string): T[] {
//     return fixture.nativeElement.querySelectorAll(selector);
//   }
// }

// function createComponent() {
//   fixture = TestBed.createComponent(HeroDetailComponent);
//   component = fixture.componentInstance;
//   page = new Page(fixture);

//   // 1st change detection triggers ngOnInit which gets a hero
//   fixture.detectChanges();
//   return fixture.whenStable().then(() => {
//     // 2nd change detection displays the async-fetched hero
//     fixture.detectChanges();
//   });
// }

function createRouterSpy() {
  return jasmine.createSpyObj('Router', ['navigate']);
}