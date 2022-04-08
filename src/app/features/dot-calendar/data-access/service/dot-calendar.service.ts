import { Injectable } from '@angular/core';
import { ActivityInterface } from '@core/interface/activity.interface';
import { DayBoardInterface } from '@core/interface/day-board.interface';
import { DotInterface } from '@core/interface/dot.interface';

@Injectable({
  providedIn: 'root',
})
export class DotCalendarService {
  private _getHoursOfDay(): Array<number> {
    const hours = 24;
    const result = [];
    for (let i = 0; i < hours; i++) {
      result.push(i);
    }
    return result;
  }

  private _getMinutesOfHour(timePerSlot: number): Array<number> {
    let startingPoint = 0;
    const result = [];
    do {
      result.push(startingPoint);
      startingPoint += timePerSlot;
    } while (startingPoint < 60);
    return result;
  }

  mergeWithActivites(config: DayBoardInterface, activities: ActivityInterface[]) {
    const activityMap = new Map<string, ActivityInterface>();
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
        activityMap.set(activity.id, activity);
        row[index] = { ...dot, color: activity.color, name: activity.name };
      });
    });
    return config;
  }

  generateNewDayBoard(date: string, minutesPerSlot = 15): Omit<DayBoardInterface, 'id'> {
    const hours = this._getHoursOfDay();
    const slots = this._getMinutesOfHour(minutesPerSlot);

    const board: DotInterface[][] = [];
    for (let i = 0; i < hours.length; i++) {
      const newBoardEntry: DotInterface[] = [];
      board[i] = newBoardEntry;
      for (let j = 0; j < slots.length; j++) {
        board[i][j] = { color: '' } as DotInterface;
      }
    }
    const config = {
      hours,
      slots,
      date,
      board,
    };
    return config;
  }
}
