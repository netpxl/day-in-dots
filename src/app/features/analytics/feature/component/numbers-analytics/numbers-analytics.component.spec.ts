import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumbersAnalyticsComponent } from './numbers-analytics.component';

describe('NumbersAnalyticsComponent', () => {
  let component: NumbersAnalyticsComponent;
  let fixture: ComponentFixture<NumbersAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NumbersAnalyticsComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NumbersAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
