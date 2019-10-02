import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavItemSetComponent } from './nav-item-set.component';

describe('NavItemSetComponent', () => {
  let component: NavItemSetComponent;
  let fixture: ComponentFixture<NavItemSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavItemSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavItemSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
