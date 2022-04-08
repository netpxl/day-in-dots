import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError, map, mergeMap, of,
} from 'rxjs';
import { StoreService } from '../service/store.service.abstract';
import * as ActivityManagementActions from './activity-managment.actions';

@Injectable()
export class ActivityManagementEffects {
  loadActivities$ = createEffect(() => this.actions$.pipe(
    ofType(ActivityManagementActions.loadActivities),
    mergeMap(() => this.storageService.getActivities().pipe(
      map(
        (activities) => ActivityManagementActions.loadActivitiesSuccess({ activities }),
        catchError((error) => of(ActivityManagementActions.loadActivitiesFailure({ error }))),
      ),
    )),
  ));

  createActivity$ = createEffect(() => this.actions$
    .pipe(
      ofType(ActivityManagementActions.createActivity),
      mergeMap((payload) => this.storageService.saveActivity(payload.activity).pipe(
        map(
          ({ activities, currentlySelected }) => (ActivityManagementActions.createActivitySuccess({ activities, currentlySelected })),
          catchError((error) => of(ActivityManagementActions.createActivityFailure({ error }))),
        ),
      )),
    ));

  updateActivity$ = createEffect(() => this.actions$
    .pipe(
      ofType(ActivityManagementActions.updateActivity),
      mergeMap((payload) => this.storageService.updateActivity(payload.activity).pipe(
        map(({ activities, currentlySelected }) => (ActivityManagementActions.updateActivitySuccess({ activities, currentlySelected }))),
        catchError((error) => of(ActivityManagementActions.updateActivityFailure({ error }))),
      )),
    ));

  deleteActivity$ = createEffect(() => this.actions$
    .pipe(
      ofType(ActivityManagementActions.deleteActivity),
      mergeMap((payload) => this.storageService.deleteActivity(payload.activity).pipe(
        map(({ activities, currentlySelected }) => (ActivityManagementActions.deleteActivitySuccess({ activities, currentlySelected }))),
        catchError((error) => of(ActivityManagementActions.deleteActivityFailure({ error }))),
      )),
    ));

  constructor(
    private actions$: Actions,
    private storageService: StoreService,
  ) {}
}
