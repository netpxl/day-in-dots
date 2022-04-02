import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityTrackingComponent } from './activity-tracking.component';

describe('ActivityTrackingComponent', () => {
  let component: ActivityTrackingComponent;
  let fixture: ComponentFixture<ActivityTrackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActivityTrackingComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
