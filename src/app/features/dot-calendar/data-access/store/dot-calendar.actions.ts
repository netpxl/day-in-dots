import { ActivityInterface } from '@core/interface/activity.interface';
import { DayBoardInterface } from '@core/interface/day-board.interface';
import { createAction, props } from '@ngrx/store';

export const loadDotCalendar = createAction(
  '[DotCalendar] Load DotCalendar',
  props<{ requestedDate: string }>(),
);

export const loadDotCalendarSuccess = createAction(
  '[DotCalendar] Load DotCalendar Success',
  props<{ dotCalendar: DayBoardInterface }>(),
);

export const loadDotCalendarFailure = createAction(
  '[DotCalendar] Load DotCalendar Failure',
  props<{ error: string }>(),
);

export const saveDotCalendar = createAction(
  '[DotCalendar] Save DotCalendar',
  props<{ dotCalendar: Omit<DayBoardInterface, 'id'> }>(),
);

export const saveDotCalendarSuccess = createAction(
  '[DotCalendar] Save DotCalendar Success',
  props<{ dotCalendar: DayBoardInterface }>(),
);

export const saveDotCalendarFailure = createAction(
  '[DotCalendar] Save DotCalendar Failure',
  props<{ error: string }>(),
);

export const reloadDotCalendar = createAction(
  '[DotCalendar] Reload DotCalendar',
  props<{ activities: ActivityInterface[] }>(),
);

export const reloadDotCalendarSuccess = createAction(
  '[DotCalendar] Reload DotCalendar Success',
  props<{ dotCalendar: DayBoardInterface }>(),
);

export const reloadDotCalendarFailure = createAction(
  '[DotCalendar] Reload DotCalendar Failure',
  props<{ error: string }>(),
);
