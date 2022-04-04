import { createFeatureSelector, createSelector } from '@ngrx/store';
import { activityManagementFeatureKey, ActivitymanagementState } from './activity-management.reducer';

export const selectFeature = createFeatureSelector<ActivitymanagementState>(activityManagementFeatureKey);

export const selectStateActivities = createSelector(
  selectFeature,
  (state: ActivitymanagementState) => state.activities,
);

export const selectStateError = createSelector(
  selectFeature,
  (state: ActivitymanagementState) => state.error,
);
