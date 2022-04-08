import { Injectable } from '@angular/core';
import { ActivityDtoInterface } from '@core/interface/activity-dto.interface';
import { ActivityInterface } from '@core/interface/activity.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export abstract class StoreService {
  abstract getActivities(): Observable<ActivityInterface[]>;
  abstract saveActivity(activity: Omit<ActivityInterface, 'id'>): Observable<ActivityDtoInterface>;
  abstract updateActivity(activity: ActivityInterface): Observable<ActivityDtoInterface>;
  abstract deleteActivity(activity: ActivityInterface): Observable<ActivityDtoInterface>;
}
