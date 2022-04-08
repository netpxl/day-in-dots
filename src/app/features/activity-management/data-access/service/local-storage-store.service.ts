import { Injectable } from '@angular/core';
import { ActivityDtoInterface } from '@core/interface/activity-dto.interface';
import { ActivityInterface } from '@core/interface/activity.interface';
import {
  Observable, of,
} from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { StoreService } from './store.service.abstract';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageStoreService extends StoreService {
  private _getActivities(): ActivityInterface[] {
    return JSON.parse(
      localStorage.getItem('activities') || '[]',
    );
  }

  getActivities(): Observable<ActivityInterface[]> {
    return of(this._getActivities());
  }

  saveActivity(activity: Omit<ActivityInterface, 'id'>): Observable<ActivityDtoInterface> {
    const activities = this._getActivities();
    const newActivity: ActivityInterface = {
      ...activity,
      id: uuidv4(),
    };
    activities.push(newActivity);
    localStorage.setItem('activities', JSON.stringify(activities));
    return of({ activities, currentlySelected: newActivity });
  }

  updateActivity(activity: ActivityInterface): Observable<ActivityDtoInterface> {
    const activities = this._getActivities();
    const editedIndex = activities.findIndex((savedActivity) => savedActivity.id === activity.id);
    if (editedIndex < 0) {
      const newActivity = JSON.parse(JSON.stringify(activity));
      delete newActivity.id;
      return this.saveActivity(newActivity as Omit<ActivityInterface, 'id'>);
    }
    activities[editedIndex] = activity;
    localStorage.setItem('activities', JSON.stringify(activities));
    return of({ activities, currentlySelected: activity });
  }

  deleteActivity(activity: ActivityInterface): Observable<ActivityDtoInterface> {
    const filteredActivities = this._getActivities().filter((savedActivity) => savedActivity.id !== activity.id);
    localStorage.setItem('activities', JSON.stringify(filteredActivities));
    return of({ activities: filteredActivities, currentlySelected: activity });
  }
}
