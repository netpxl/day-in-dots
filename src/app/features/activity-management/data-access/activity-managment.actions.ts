import { createAction, props } from '@ngrx/store';
import { ActivityInterface } from 'src/app/core/interface/activity.interface';

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
  '[ActivityManagment] Create Activities',
  props<{ activity: ActivityInterface }>(),
);

export const createActivitySuccess = createAction(
  '[ActivityManagment] create Activity Success',
  props<{ activities: ActivityInterface[] }>(),
);

export const createActivityFailure = createAction(
  '[ActivityManagment] Load Activity Failure',
  props<{ error: string }>(),
);

export const updateActivity = createAction(
  '[ActivityManagment] Update Activities',
  props<{ activity: ActivityInterface }>(),
);

export const updateActivitySuccess = createAction(
  '[ActivityManagment] Update Activity Success',
  props<{ activities: ActivityInterface[] }>(),
);

export const updateActivityFailure = createAction(
  '[ActivityManagment] Update Activity Failure',
  props<{ error: string }>(),
);

export const deleteActivity = createAction(
  '[ActivityManagment] Delete Activities',
  props<{ activity: ActivityInterface }>(),
);

export const deleteActivitySuccess = createAction(
  '[ActivityManagment] Delete Activity Success',
  props<{ activities: ActivityInterface[] }>(),
);

export const deleteActivityFailure = createAction(
  '[ActivityManagment] Delete Activity Failure',
  props<{ error: string }>(),
);
