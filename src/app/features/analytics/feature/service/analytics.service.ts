import { Injectable } from '@angular/core';
import { AnalyticsInterface } from '@core/interface/analytics.interface';
import { DotInterface } from '@core/interface/dot.interface';
import { selectStateDotCalendar } from '@dot-calendar/data-access/store/dot-calendar.selectors';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  constructor(private readonly store: Store) { }

  prepareAnalyticData(): Observable<AnalyticsInterface[]> {
    return this.store.select(selectStateDotCalendar).pipe(map((config) => {
      if (!config) {
        return [];
      }
      const dotCollection = new Map<string, AnalyticsInterface>();
      for (const row of Object.values(config.board)) {
        for (const dot of Object.values(row)) {
          this.handleSingleDotInMap(dotCollection, dot);
        }
      }
      const result: AnalyticsInterface[] = [];
      dotCollection.forEach((value) => result.push(value));
      return result;
    }));
  }

  handleSingleDotInMap(mapData: Map<string, AnalyticsInterface>, dot: DotInterface) {
    if (dot.activityId) {
      let currentEntry = mapData.get(dot.activityId);
      if (!currentEntry) {
        currentEntry = { name: dot.name || '', slotsUsed: 0, color: dot.color || '' };
      }
      currentEntry.slotsUsed += 1;
      mapData.set(dot.activityId, currentEntry);
    }
  }
}
