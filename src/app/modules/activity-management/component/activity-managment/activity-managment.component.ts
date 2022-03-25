import { Component, OnInit } from '@angular/core';
import { ActivityInterface } from 'src/app/core/interfaces/activity.interface';
import { StoreService } from 'src/app/shared/services/store.service.abstract';

@Component({
  selector: 'app-activity-managment',
  templateUrl: './activity-managment.component.html',
  styleUrls: ['./activity-managment.component.scss']
})
export class ActivityManagmentComponent implements OnInit {

  activities: ActivityInterface[] = []

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
      this.storeService.setCurrentlySelectedActivity(activity)
    })
  }

  setAsSelectedActivity(activity?: ActivityInterface|undefined): void {
    this.storeService.setCurrentlySelectedActivity(activity)
  }

  onDeleteActivity(activity: ActivityInterface): void {
    this.storeService.deleteActivity(activity).subscribe((activities) => {
      this.activities = activities;
    })
  }

  onUpdateActivity(activity: ActivityInterface): void {
    this.storeService.updateActivity(activity).subscribe((activities) => {
      this.activities = activities;
    })
  }

}
