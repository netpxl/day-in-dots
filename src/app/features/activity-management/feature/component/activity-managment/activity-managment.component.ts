import { Component, OnInit } from '@angular/core';
import { ActivityInterface } from 'src/app/core/interface/activity.interface';
import { StoreService } from 'src/app/shared/services/store.service.abstract';

@Component({
  selector: 'did-activity-managment',
  templateUrl: './activity-managment.component.html',
  styleUrls: ['./activity-managment.component.scss'],
})
export class ActivityManagmentComponent implements OnInit {
  activities: ActivityInterface[] = [];

  constructor(
    readonly storeService: StoreService,
  ) {}

  ngOnInit(): void {
    this.storeService.getActivities().subscribe((activities) => {
      this.activities = activities;
    });
  }

  onNewActivityAdded(activity: ActivityInterface): void {
    this.storeService.saveActivity(activity).subscribe((activities) => {
      this.activities = activities;
      this.setAsSelectedActivity(activity);
    });
  }

  setAsSelectedActivity(activity?: ActivityInterface | undefined): void {
    if (this.storeService.currentlySelectedActivitiy?.id === activity?.id) {
      this.storeService.setCurrentlySelectedActivity(undefined);
      return;
    }
    this.storeService.setCurrentlySelectedActivity(activity);
  }

  onDeleteActivity(activity: ActivityInterface): void {
    this.storeService.deleteActivity(activity).subscribe((activities) => {
      if (this.storeService.currentlySelectedActivitiy?.id === activity.id) {
        this.setAsSelectedActivity(undefined);
      }
      this.activities = activities;
    });
  }

  onUpdateActivity(activity: ActivityInterface): void {
    this.storeService.updateActivity(activity).subscribe((activities) => {
      this.setAsSelectedActivity(activity);
      this.activities = activities;
    });
  }
}
