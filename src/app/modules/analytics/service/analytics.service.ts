import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AnalyticsInterface } from 'src/app/core/interfaces/analytics.interface';
import { StoreService } from 'src/app/shared/services/store.service.abstract';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  constructor(private readonly storeService: StoreService) { }

  prepareAnalyticData(): Observable<AnalyticsInterface[]> {
    return this.storeService.config$.pipe(map((config) => {
      if (!config) {
        return [];
      }
      const dotCollection = new Map<string, AnalyticsInterface>();
      config.board.forEach((row) => {
        row.forEach((dot) => {
          if (dot.activityId) {
            let currentEntry = dotCollection.get(dot.activityId);
            if (!currentEntry) {
              currentEntry = { name: dot.name || '', slotsUsed: 0, color: dot.color || '' };
            }
            currentEntry.slotsUsed += 1;
            dotCollection.set(dot.activityId, currentEntry);
          }
        });
      });
      const result: AnalyticsInterface[] = [];
      dotCollection.forEach((value) => result.push(value));
      return result;
    }));
  }
}
