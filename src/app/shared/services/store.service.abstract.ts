import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { ActivityInterface } from 'src/app/core/interfaces/activity.interface';
import { DayBoardInterface } from 'src/app/core/interfaces/day-board.interface';

@Injectable({
  providedIn: 'root'
})
export abstract class StoreService {

  abstract currentlySelectedActivitiy?: ActivityInterface
  abstract config$: ReplaySubject<DayBoardInterface|undefined>

  abstract getActivities(): Observable<ActivityInterface[]> 
  abstract persistDataIntoLocalStorage(data: DayBoardInterface): Observable<boolean>
  abstract loadDotCalendar(date: string): void
  abstract setCurrentlySelectedActivity(activity: ActivityInterface|undefined): void

  abstract saveActivity(activity: ActivityInterface): Observable<ActivityInterface[]>
  abstract updateActivity(activity: ActivityInterface): Observable<ActivityInterface[]>
  abstract deleteActivity(activity: ActivityInterface): Observable<ActivityInterface[]>
}
