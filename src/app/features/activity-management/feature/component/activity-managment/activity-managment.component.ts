import { ActivityManagementState } from '@activity-management/data-access/store/activity-management.reducer';
import {
  selectStateActivities,
  selectStateCurrentlySelectedActivity,
} from '@activity-management/data-access/store/activity-management.selectors';
import { Component, OnInit } from '@angular/core';
import { ActivityInterface } from '@core/interface/activity.interface';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  loadActivities, createActivity, setCurrentlySelectedActivity, deleteActivity, updateActivity,
} from '../../../data-access/store/activity-managment.actions';

@Component({
  selector: 'did-activity-managment',
  templateUrl: './activity-managment.component.html',
  styleUrls: ['./activity-managment.component.scss'],
})
export class ActivityManagmentComponent implements OnInit {
  activities: ActivityInterface[] = [];

  currentlySelectedActivity$?: Observable<ActivityInterface | undefined>;

  constructor(
    readonly store: Store<ActivityManagementState>,
  ) {}

  ngOnInit(): void {
    this.store.select(selectStateActivities).subscribe((activities) => {
      this.activities = activities;
    });
    this.currentlySelectedActivity$ = this.store.select(selectStateCurrentlySelectedActivity);
    this.store.dispatch(loadActivities());
  }

  onNewActivityAdded(activity: Omit<ActivityInterface, 'id'>): void {
    this.store.dispatch(createActivity({ activity }));
  }

  setAsSelectedActivity(currentlySelectedActivity?: ActivityInterface | undefined): void {
    this.store.dispatch(setCurrentlySelectedActivity({ currentlySelectedActivity }));
  }

  onDeleteActivity(activity: ActivityInterface): void {
    this.store.dispatch(deleteActivity({ activity }));
  }

  onUpdateActivity(activity: ActivityInterface): void {
    this.store.dispatch(updateActivity({ activity }));
  }
}
