import { createReducer, on } from '@ngrx/store';
import { ActivityInterface } from 'src/app/core/interface/activity.interface';
import * as ActivityManagementActions from './activity-managment.actions';

export const activityManagementFeatureKey = 'activityManagement';

export interface ActivitymanagementState {
  activities: ActivityInterface[]
  error?: any
}

export const initialState: ActivitymanagementState = {
  activities: [{ id: '123', color: '', name: 'dpsadßsd' }],
};

export const reducer = createReducer(
  initialState,
  // Loading Activities
  on(ActivityManagementActions.loadActivitiesSuccess, (state, { activities }) => ({ ...state, activities })),
  on(ActivityManagementActions.loadActivitiesFailure, (state, { error }) => ({ ...state, error })),

  // Creating Activity
  on(ActivityManagementActions.createActivitySuccess, (state, { activities }) => ({ ...state, activities })),
  on(ActivityManagementActions.createActivityFailure, (state, { error }) => ({ ...state, error })),

  // Updating Activities
  on(ActivityManagementActions.updateActivitySuccess, (state, { activities }) => ({ ...state, activities })),
  on(ActivityManagementActions.updateActivityFailure, (state, { error }) => ({ ...state, error })),

  // Deleting Activity
  on(ActivityManagementActions.deleteActivitySuccess, (state, { activities }) => ({ ...state, activities })),
  on(ActivityManagementActions.deleteActivityFailure, (state, { error }) => ({ ...state, error })),
);
