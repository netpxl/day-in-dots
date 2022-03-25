import { Injectable } from '@angular/core';
import { DayBoardInterface } from 'src/app/core/interfaces/day-board.interface';
import { DotInterface } from 'src/app/core/interfaces/dot.interface';
import { v4 as uuidv4 } from 'uuid';

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

  generateNewDayBoard(date: string): DayBoardInterface {
    const hours = this._getHoursOfDay();
    const slots = this._getMinutesOfHour(15);

    const board = [];
    for (let i = 0; i < hours.length; i++) {
      const newArray: DotInterface[] = [];
      board[i] = newArray;
      for (let j = 0; j < slots.length; j++) {
        const dotConfig: DotInterface = {
          id: uuidv4(),
          hour: hours[i],
          slot: slots[j],
        };
        board[i][j] = dotConfig;
      }
    }

    return {
      hours,
      slots,
      date,
      board,
    };
  }
}
