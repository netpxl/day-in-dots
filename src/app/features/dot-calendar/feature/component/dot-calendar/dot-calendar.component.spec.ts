import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DotCalendarComponent } from './dot-calendar.component';

describe('DotCalendarComponent', () => {
  let component: DotCalendarComponent;
  let fixture: ComponentFixture<DotCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DotCalendarComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DotCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
