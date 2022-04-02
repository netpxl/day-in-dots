import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ReplaySubject, takeUntil } from 'rxjs';
import { ActivityInterface } from 'src/app/core/interface/activity.interface';
import { StoreService } from 'src/app/shared/services/store.service.abstract';
import { ActivityTrackingService } from '../../service/activity-tracking.service';

@Component({
  selector: 'did-activity-tracking-modal',
  templateUrl: './activity-tracking-modal.component.html',
  styleUrls: ['./activity-tracking-modal.component.scss'],
})
export class ActivityTrackingModalComponent implements OnInit {
  currentActivity = new FormControl();

  listOfActivities: ActivityInterface[] = [];

  stopTracking$: ReplaySubject<boolean> = new ReplaySubject();

  constructor(
    private storeService: StoreService,
    private activityTrackingService: ActivityTrackingService,
  ) {}

  ngOnInit() {
    this.storeService.getActivities().subscribe((response) => {
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
}
