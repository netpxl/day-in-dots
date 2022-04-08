import { createFeatureSelector, createSelector } from '@ngrx/store';
import { dotCalendarFeatureKey, DotCalendarState } from './dot-calendar.reducer';

export const selectFeature = createFeatureSelector<DotCalendarState>(dotCalendarFeatureKey);

export const selectStateDotCalendar = createSelector(
  selectFeature,
  (state: DotCalendarState) => state.currentDotCalendar,
);

export const selectStateError = createSelector(
  selectFeature,
  (state: DotCalendarState) => state.error,
);
