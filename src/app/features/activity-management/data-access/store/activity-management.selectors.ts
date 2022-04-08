import { createFeatureSelector, createSelector } from '@ngrx/store';
import { activityManagementFeatureKey, ActivityManagementState } from './activity-management.reducer';

export const selectFeature = createFeatureSelector<ActivityManagementState>(activityManagementFeatureKey);

export const selectStateActivities = createSelector(
  selectFeature,
  (state: ActivityManagementState) => state.activities,
);

export const selectStateError = createSelector(
  selectFeature,
  (state: ActivityManagementState) => state.error,
);

export const selectStateCurrentlySelectedActivity = createSelector(
  selectFeature,
  (state: ActivityManagementState) => state.currentlySelectedActivity,
);
