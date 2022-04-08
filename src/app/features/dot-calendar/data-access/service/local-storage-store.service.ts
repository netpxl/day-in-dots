import { Injectable } from '@angular/core';
import { DayBoardInterface } from '@core/interface/day-board.interface';
import {
  Observable, of,
} from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { StoreService } from './store.service.abstract';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageStoreService extends StoreService {
  persistData(data: Omit<DayBoardInterface, 'id'>): Observable<DayBoardInterface> {
    const newData = JSON.parse(JSON.stringify(data)) as DayBoardInterface;
    newData.id = uuidv4();
    newData.board.forEach((row) => {
      row.map((dot) => {
        delete dot.name;
        delete dot.color;
        return dot;
      });
    });

    localStorage.setItem(`DotCalendar-${data.date}`, JSON.stringify(newData));
    return of(newData);
  }

  loadDotCalendar(date: string): Observable<DayBoardInterface | undefined> {
    const board = localStorage.getItem(`DotCalendar-${date}`);
    if (!board) {
      return of(undefined);
    }
    const parsedBoard = JSON.parse(board);
    return of(parsedBoard);
  }
}
