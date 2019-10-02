import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DegRangeComponent } from './deg-range.component';

describe('DegRangeComponent', () => {
  let component: DegRangeComponent;
  let fixture: ComponentFixture<DegRangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DegRangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DegRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
