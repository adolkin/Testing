import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerBindingComponent } from './banner-binding.component';

describe('BannerBindingComponent (inline template)', () => {
  let component: BannerBindingComponent;
  let fixture: ComponentFixture<BannerBindingComponent>;
  let h1: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BannerBindingComponent],
    });
    fixture = TestBed.createComponent(BannerBindingComponent);
    component = fixture.componentInstance; // BannerBindingComponent test instance
    h1 = fixture.nativeElement.querySelector('h1');
  });

  it('no title in the DOM after createComponent()', () => {
    expect(h1.textContent).toEqual('');
  });

  it('should display original title', () => {
    fixture.detectChanges();
    expect(h1.textContent).toContain(component.title);
  });

  it('should display original title after detectChanges()', () => {
    fixture.detectChanges();
    expect(h1.textContent).toContain(component.title);
  });

  it('should display a different test title', () => {
    component.title = 'Test Title';
    fixture.detectChanges();
    expect(h1.textContent).toContain('Test Title');
  });

});
