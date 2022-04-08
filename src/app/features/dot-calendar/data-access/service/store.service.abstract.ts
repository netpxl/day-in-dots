import { Injectable } from '@angular/core';
import { DayBoardInterface } from '@core/interface/day-board.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export abstract class StoreService {
  abstract persistData(data: Omit<DayBoardInterface, 'id'>): Observable<DayBoardInterface>;
  abstract loadDotCalendar(date: string): Observable<DayBoardInterface | undefined>;
}
