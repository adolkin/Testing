import { By } from '@angular/platform-browser';
import { UserService } from './../model/user.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeComponent } from './welcome.component';
import { DebugElement } from '@angular/core';

describe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;
  let componentUserService: UserService; // the actually injected service
  let userService: UserService; // the TestBed injected service
  let de: DebugElement;  // the DebugElement with the welcome message
  let el: HTMLElement; // the DOM element with the welcome message

  let userServiceStub: {
    isLoggedIn: boolean;
    user: { name: string }
  };

  beforeEach(() => {
    // stub UserService for test purposes
    userServiceStub = {
      isLoggedIn: true,
      user: { name: 'Test User' }
    };

    TestBed.configureTestingModule({
      declarations: [WelcomeComponent],
      // providers:    [ UserService ]  // NO! Don't provide the real service!
      // Provide a test-double instead
      providers: [{ provide: UserService, useValue: userServiceStub }]
    });

    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;

    // UserService actually injected into the component
    userService = fixture.debugElement.injector.get(UserService);
    componentUserService = userService;
    // Or UserService from the root injector
    userService = TestBed.get(UserService);

    //  get the "welcome" element by CSS selector (e.g., by class name)
    de = fixture.debugElement.query(By.css('.welcome'));
    el = de.nativeElement;
  });

  it('should welcome the user', () => {
    fixture.detectChanges();
    const content = el.textContent;
    expect(content).toContain('Welcome', '"Welcome ..."');
    expect(content).toContain('Test User', 'expected name');
  });

  it('should welcome "Bubba"', () => {
    userService.user.name = 'Bubba'; // welcome message hasn't been shown yet
    fixture.detectChanges();
    expect(el.textContent).toContain('Bubba');
  });

  it('should request login if not logged in', () => {
    userService.isLoggedIn = false; // welcome message hasn't been shown yet
    fixture.detectChanges();
    const content = el.textContent;
    expect(content).not.toContain('Welcome', 'not welcomed');
    expect(content).toMatch(/log in/i, '"log in"');
  });

  it('stub object and injected UserService should not be the same', () => {
    expect(userServiceStub === userService).toBe(false);

    // Changing the stub object has no effect on the injected service
    userServiceStub.isLoggedIn = false;
    expect(userService.isLoggedIn).toBe(true);
  });
});
