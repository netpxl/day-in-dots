import { ActivityInterface } from '@core/interface/activity.interface';
import { createReducer, on } from '@ngrx/store';
import * as ActivityManagementActions from './activity-managment.actions';

export const activityManagementFeatureKey = 'activityManagement';

export interface ActivityManagementState {
  activities: ActivityInterface[]
  error?: string
  currentlySelectedActivity?: ActivityInterface | undefined
}

export const initialState: ActivityManagementState = {
  activities: [],
};

export const reducer = createReducer(
  initialState,
  // Loading Activities
  on(ActivityManagementActions.loadActivitiesSuccess, (state, { activities }) => ({ ...state, activities })),
  on(ActivityManagementActions.loadActivitiesFailure, (state, { error }) => ({ ...state, error })),

  // Creating Activity
  on(ActivityManagementActions.createActivitySuccess, (state, { activities, currentlySelected }) => {
    const newState = { ...state, activities };
    if (currentlySelected) {
      newState.currentlySelectedActivity = currentlySelected;
    }
    return newState;
  }),
  on(ActivityManagementActions.createActivityFailure, (state, { error }) => ({ ...state, error })),

  // Updating Activities
  on(ActivityManagementActions.updateActivitySuccess, (state, { activities, currentlySelected }) => {
    const newState = { ...state, activities };
    if (currentlySelected) {
      newState.currentlySelectedActivity = currentlySelected;
    }
    return newState;
  }),
  on(ActivityManagementActions.updateActivityFailure, (state, { error }) => ({ ...state, error })),

  // Deleting Activity
  on(ActivityManagementActions.deleteActivitySuccess, (state, { activities, currentlySelected }) => {
    const newState = { ...state, activities };
    if (currentlySelected?.id === state.currentlySelectedActivity?.id) {
      newState.currentlySelectedActivity = undefined;
    }
    return newState;
  }),
  on(ActivityManagementActions.deleteActivityFailure, (state, { error }) => ({ ...state, error })),

  // currently selected activity
  on(
    ActivityManagementActions.setCurrentlySelectedActivity,
    (state, { currentlySelectedActivity }) => ({ ...state, currentlySelectedActivity }),
  ),
  on(
    ActivityManagementActions.unselectIfCurrentlySelectedActivity,
    (state, { currentlySelectedActivity }) => {
      if (state.currentlySelectedActivity?.id === currentlySelectedActivity?.id) {
        currentlySelectedActivity = undefined;
      }
      return { ...state, currentlySelectedActivity };
    },
  ),
);
