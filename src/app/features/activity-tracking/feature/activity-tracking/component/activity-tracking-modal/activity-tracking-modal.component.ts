import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivityInterface } from '@core/interface/activity.interface';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'did-activity-tracking-modal',
  templateUrl: './activity-tracking-modal.component.html',
  styleUrls: ['./activity-tracking-modal.component.scss'],
})
export class ActivityTrackingModalComponent {
  currentActivity = new FormControl();

  listOfActivities: ActivityInterface[] = [];

  stopTracking$: ReplaySubject<boolean> = new ReplaySubject();
/**
  constructor(
    private store: Store,
    private activityTrackingService: ActivityTrackingService,
  ) {}

  ngOnInit() {
    this.store.select(selectStateActivities).subscribe((response) => {
      if (!response?.length) {
        this.listOfActivities = [];
        return;
      }
      this.listOfActivities = response;
    });
  }

  startTracking() {
    if (!this.currentActivity.valid) {
      return;
    }
    this.activityTrackingService.handleActivityChange(this.currentActivity.value);
    this.currentActivity.valueChanges.pipe(takeUntil(this.stopTracking$)).subscribe((value) => {
      this.activityTrackingService.handleActivityChange(value);
    });
  }

  stopTracking() {
    this.stopTracking$.next(true);
    this.stopTracking$.next(false);
  }

  closeModal() {

  }
   */
}
