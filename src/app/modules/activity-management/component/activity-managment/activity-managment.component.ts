import { Component, OnInit } from '@angular/core';
import { ActivityInterface } from 'src/app/core/interfaces/activity.interface';
import { LocalStorageStoreService } from 'src/app/shared/services/local-storage-store.service';
import { StoreService } from 'src/app/shared/services/store.service.abstract';

@Component({
  selector: 'app-activity-managment',
  templateUrl: './activity-managment.component.html',
  styleUrls: ['./activity-managment.component.scss']
})
export class ActivityManagmentComponent implements OnInit {

  activities: ActivityInterface[] = []

  constructor(
    private readonly storeService: LocalStorageStoreService,
  ) {}

  ngOnInit(): void {
     this.storeService.getActivities().subscribe((activities) => {
      this.activities = activities;
     });
  }

  onNewActivityAdded(activity: ActivityInterface): void {
    this.storeService.saveActivity(activity).subscribe((activities) => {
      this.activities = activities;
    })
  }

  setAsSelectedActivity(activity: ActivityInterface): void {
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
