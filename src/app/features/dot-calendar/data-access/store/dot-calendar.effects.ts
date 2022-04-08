import { selectStateActivities } from '@activity-management/data-access/store/activity-management.selectors';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  catchError, map, mergeMap, of, withLatestFrom,
} from 'rxjs';
import { DotCalendarService } from '../service/dot-calendar.service';
import { StoreService } from '../service/store.service.abstract';
import * as DotCalendarActions from './dot-calendar.actions';
import { selectStateDotCalendar } from './dot-calendar.selectors';

@Injectable()
export class DotCalendarEffects {
  loadDotCalendar$ = createEffect(() => this.actions$.pipe(
    ofType(DotCalendarActions.loadDotCalendar),
    withLatestFrom(this.store.select(selectStateActivities)),
    mergeMap(([{ requestedDate }, activities]) => this.storageService.loadDotCalendar(requestedDate).pipe(
      map((dotCalendar) => {
        if (!dotCalendar) {
          const newBoard = this.dotCalendarService.generateNewDayBoard(requestedDate);
          return DotCalendarActions.saveDotCalendar({ dotCalendar: newBoard });
        }
        dotCalendar = this.dotCalendarService.mergeWithActivites(dotCalendar, activities);
        return DotCalendarActions.loadDotCalendarSuccess({ dotCalendar });
      }),
      catchError((error) => of(DotCalendarActions.loadDotCalendarFailure({ error }))),
    )),
  ));

  saveDotCalendar$ = createEffect(() => this.actions$
    .pipe(
      ofType(DotCalendarActions.saveDotCalendar),
      withLatestFrom(this.store.select(selectStateActivities)),
      mergeMap(([{ dotCalendar }, activities]) => this.storageService.persistData(dotCalendar).pipe(
        map(
          (updatedDotCalendar) => {
            updatedDotCalendar = this.dotCalendarService.mergeWithActivites(updatedDotCalendar, activities);
            return DotCalendarActions.loadDotCalendarSuccess({ dotCalendar: updatedDotCalendar });
          },
        ),
        catchError((error) => of(DotCalendarActions.loadDotCalendarFailure({ error }))),
      )),
    ));

  reloadDotCalendar$ = createEffect(() => this.actions$
    .pipe(
      ofType(DotCalendarActions.reloadDotCalendar),
      withLatestFrom(this.store.select(selectStateDotCalendar)),
      map(([{ activities }, calendar]) => {
        if (!calendar) {
          return DotCalendarActions.loadDotCalendar({ requestedDate: '' });
        }
        const dotCalendar = this.dotCalendarService.mergeWithActivites(calendar, activities);
        return DotCalendarActions.loadDotCalendarSuccess({ dotCalendar });
      }),
      catchError((error) => of(DotCalendarActions.loadDotCalendarFailure({ error }))),
    ));

  constructor(
    private actions$: Actions,
    private storageService: StoreService,
    private readonly store: Store,
    private dotCalendarService: DotCalendarService,
  ) {}
}
