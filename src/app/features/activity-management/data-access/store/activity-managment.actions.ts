import { ActivityInterface } from '@core/interface/activity.interface';
import { createAction, props } from '@ngrx/store';

export const loadActivities = createAction(
  '[ActivityManagment] Load Activities',
);

export const loadActivitiesSuccess = createAction(
  '[ActivityManagment] Load Activities Success',
  props<{ activities: ActivityInterface[] }>(),
);

export const loadActivitiesFailure = createAction(
  '[ActivityManagment] Load Activities Failure',
  props<{ error: string }>(),
);

export const createActivity = createAction(
  '[ActivityManagment] Create Activity',
  props<{ activity: Omit<ActivityInterface, 'id'> }>(),
);

export const createActivitySuccess = createAction(
  '[ActivityManagment] Create Activity Success',
  props<{ activities: ActivityInterface[], currentlySelected?: ActivityInterface }>(),
);

export const createActivityFailure = createAction(
  '[ActivityManagment] Create Activity Failure',
  props<{ error: string }>(),
);

export const updateActivity = createAction(
  '[ActivityManagment] Update Activity',
  props<{ activity: ActivityInterface }>(),
);

export const updateActivitySuccess = createAction(
  '[ActivityManagment] Update Activity Success',
  props<{ activities: ActivityInterface[], currentlySelected?: ActivityInterface }>(),
);

export const updateActivityFailure = createAction(
  '[ActivityManagment] Update Activity Failure',
  props<{ error: string }>(),
);

export const deleteActivity = createAction(
  '[ActivityManagment] Delete Activity',
  props<{ activity: ActivityInterface }>(),
);

export const deleteActivitySuccess = createAction(
  '[ActivityManagment] Delete Activity Success',
  props<{ activities: ActivityInterface[], currentlySelected?: ActivityInterface }>(),
);

export const deleteActivityFailure = createAction(
  '[ActivityManagment] Delete Activity Failure',
  props<{ error: string }>(),
);

export const setCurrentlySelectedActivity = createAction(
  '[ActivityManagment] Set Currently Selected Activity',
  props<{ currentlySelectedActivity?: ActivityInterface | undefined }>(),
);

export const unselectIfCurrentlySelectedActivity = createAction(
  '[ActivityManagment] Unselect Activity if Currently Selected Activity',
  props<{ currentlySelectedActivity?: ActivityInterface | undefined }>(),
);
