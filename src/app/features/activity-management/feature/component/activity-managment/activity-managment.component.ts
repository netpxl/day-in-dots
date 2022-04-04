import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivityInterface } from 'src/app/core/interface/activity.interface';
import { StoreService } from 'src/app/shared/services/store.service.abstract';
import { ActivitymanagementState } from '../../../data-access/activity-management.reducer';
import { selectStateActivities } from '../../../data-access/activity-management.selectors';
import {
  createActivity, deleteActivity, loadActivities, updateActivity,
} from '../../../data-access/activity-managment.actions';

@Component({
  selector: 'did-activity-managment',
  templateUrl: './activity-managment.component.html',
  styleUrls: ['./activity-managment.component.scss'],
})
export class ActivityManagmentComponent implements OnInit {
  activities: ActivityInterface[] = [];

  constructor(
    readonly storeService: StoreService,
    readonly store: Store<ActivitymanagementState>,
  ) {}

  ngOnInit(): void {
    this.store.select(selectStateActivities).subscribe((activities) => {
      this.activities = activities;
    });
    this.store.dispatch(loadActivities());
  }

  onNewActivityAdded(activity: ActivityInterface): void {
    this.store.dispatch(createActivity({ activity }));
  }

  setAsSelectedActivity(activity?: ActivityInterface | undefined): void {
    if (this.storeService.currentlySelectedActivitiy?.id === activity?.id) {
      this.storeService.setCurrentlySelectedActivity(undefined);
      return;
    }
    this.storeService.setCurrentlySelectedActivity(activity);
  }

  onDeleteActivity(activity: ActivityInterface): void {
    if (this.storeService.currentlySelectedActivitiy?.id === activity.id) {
      this.setAsSelectedActivity(undefined);
    }
    this.store.dispatch(deleteActivity({ activity }));
  }

  onUpdateActivity(activity: ActivityInterface): void {
    this.setAsSelectedActivity(activity);
    this.store.dispatch(updateActivity({ activity }));
  }
}
