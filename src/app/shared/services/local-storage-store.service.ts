import { Injectable } from '@angular/core';
import {
  Observable, of, ReplaySubject, take,
} from 'rxjs';
import { ActivityInterface } from 'src/app/core/interface/activity.interface';
import { DayBoardInterface } from 'src/app/core/interface/day-board.interface';
import { StoreService } from './store.service.abstract';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageStoreService extends StoreService {
  currentlySelectedActivitiy?: ActivityInterface;

  config$: ReplaySubject<DayBoardInterface | undefined> = new ReplaySubject<DayBoardInterface | undefined>();

  private _getActivities(): ActivityInterface[] {
    return JSON.parse(
      localStorage.getItem('activities') || '[]',
    );
  }

  getActivities(): Observable<ActivityInterface[]> {
    return of(JSON.parse(
      localStorage.getItem('activities') || '[]',
    ));
  }

  saveActivity(activity: ActivityInterface): Observable<ActivityInterface[]> {
    const activities = this._getActivities();
    activities.push(activity);
    localStorage.setItem('activities', JSON.stringify(activities));
    return of(activities);
  }

  updateActivity(activity: ActivityInterface): Observable<ActivityInterface[]> {
    const activities = this._getActivities();
    const editedIndex = activities.findIndex((savedActivity) => savedActivity.id === activity.id);
    if (editedIndex < 0) {
      return of(activities);
    }
    activities[editedIndex] = activity;
    localStorage.setItem('activities', JSON.stringify(activities));
    this.rerenderBoard();
    return of(activities);
  }

  deleteActivity(activity: ActivityInterface): Observable<ActivityInterface[]> {
    let activities = this._getActivities();
    activities = activities.filter((savedActivity) => savedActivity.id !== activity.id);
    localStorage.setItem('activities', JSON.stringify(activities));
    this.rerenderBoard();
    return of(activities);
  }

  persistDataIntoLocalStorage(data: DayBoardInterface): Observable<boolean> {
    const newData = JSON.parse(JSON.stringify(data)) as DayBoardInterface;
    newData.board.forEach((row) => {
      row.map((dot) => {
        delete dot.color;
        return dot;
      });
    });
    this.config$.next(data);
    localStorage.setItem(`DotCalendar-${data.date}`, JSON.stringify(newData));
    return of(true);
  }

  loadDotCalendar(date: string): void {
    const board = localStorage.getItem(`DotCalendar-${date}`);
    if (!board) {
      this.config$.next(undefined);
      return;
    }
    const parsedBoard = JSON.parse(board);
    this.config$.next(this.mergeWithActivites(parsedBoard, this._getActivities()));
  }

  mergeWithActivites(config: DayBoardInterface, activities: ActivityInterface[]) {
    config.board.forEach((row) => {
      row.forEach((dot, index) => {
        const activity = activities.find((savedActivity) => savedActivity.id === dot.activityId);
        if (!activity) {
          delete dot.color;
          delete dot.activityId;
          delete dot.name;
          row[index] = dot;
          return;
        }
        row[index] = { ...dot, color: activity.color, name: activity.name };
      });
    });
    return config;
  }

  setCurrentlySelectedActivity(activity: ActivityInterface | undefined) {
    this.currentlySelectedActivitiy = activity;
  }

  rerenderBoard() {
    this.config$.pipe(take(1)).subscribe((config) => {
      if (!config) {
        this.config$.next(config);
        return;
      }
      this.config$.next(this.mergeWithActivites(config, this._getActivities()));
    });
  }
}
