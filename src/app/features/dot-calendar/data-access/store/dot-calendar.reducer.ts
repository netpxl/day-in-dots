import { DayBoardInterface } from '@core/interface/day-board.interface';
import { createReducer, on } from '@ngrx/store';
import * as DotCalendarActions from './dot-calendar.actions';

export const dotCalendarFeatureKey = 'dotCalendar';

export interface DotCalendarState {
  currentDotCalendar?: DayBoardInterface
  error?: string
}

export const initialState: DotCalendarState = {};

export const reducer = createReducer(
  initialState,
  // Loading DotCalendar
  on(DotCalendarActions.loadDotCalendarSuccess, (state, { dotCalendar }) => ({ ...state, currentDotCalendar: dotCalendar })),
  on(DotCalendarActions.loadDotCalendarFailure, (state, { error }) => ({ ...state, error })),
);
