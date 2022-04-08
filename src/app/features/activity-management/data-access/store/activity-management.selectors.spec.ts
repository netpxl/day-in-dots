import { ActivityInterface } from '@core/interface/activity.interface';
import { ActivityManagementState } from './activity-management.reducer';
import {
  selectFeature, selectStateActivities, selectStateCurrentlySelectedActivity, selectStateError,
} from './activity-management.selectors';

describe('ActivityManagement Selectors', () => {
  const startingState: ActivityManagementState = { activities: [] };
  startingState.currentlySelectedActivity = { id: '1233' } as ActivityInterface;
  startingState.error = 'error';
  const fullState = { activityManagement: startingState };

  it('should select the feature state', () => {
    expect(selectFeature(fullState)).toEqual(startingState);
  });

  it('should select the activities', () => {
    expect(selectStateActivities(fullState)).toEqual([]);
  });

  it('should select the currentlySelectedActivity', () => {
    expect(selectStateCurrentlySelectedActivity(fullState)).toEqual({ id: '1233' } as ActivityInterface);
  });

  it('should select the error', () => {
    expect(selectStateError(fullState)).toEqual('error');
  });
});
