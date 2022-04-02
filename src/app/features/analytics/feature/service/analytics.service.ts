import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AnalyticsInterface } from 'src/app/core/interface/analytics.interface';
import { DotInterface } from 'src/app/core/interface/dot.interface';
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
