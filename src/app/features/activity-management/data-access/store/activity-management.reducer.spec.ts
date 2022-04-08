import { reducer, initialState } from './activity-management.reducer';
import * as ActivityManagementActions from './activity-managment.actions';

describe('ActivityManagement Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  describe('Loading activities', () => {
    it('should handle success', () => {
      const activities = [{ color: 'red', id: '123', name: 'hello' }];
      const action = ActivityManagementActions.loadActivitiesSuccess({ activities });
      const result = reducer(initialState, action);
      expect(result.activities).toBe(activities);
    });

    it('should handle error', () => {
      const action = ActivityManagementActions.loadActivitiesFailure({ error: 'error thrown' });
      const result = reducer(initialState, action);
      expect(result.error).toBe('error thrown');
    });
  });

  describe('Create activities', () => {
    it('should handle success', () => {
      const activities = [{ color: 'red', id: '123', name: 'hello' }];
      const action = ActivityManagementActions.createActivitySuccess({ activities });
      const result = reducer(initialState, action);
      expect(result.activities).toBe(activities);
    });

    it('should handle success and set currentlySelected', () => {
      const activities = [{ color: 'red', id: '123', name: 'hello' }];
      const currentlySelected = { color: 'green', id: '12356', name: 'hello2' };
      const action = ActivityManagementActions.createActivitySuccess({ activities, currentlySelected });
      const result = reducer(initialState, action);
      expect(result.activities).toBe(activities);
      expect(result.currentlySelectedActivity).toEqual(currentlySelected);
    });

    it('should handle error', () => {
      const action = ActivityManagementActions.createActivityFailure({ error: 'error thrown' });
      const result = reducer(initialState, action);
      expect(result.error).toBe('error thrown');
    });
  });

  describe('Update activities', () => {
    it('should handle success', () => {
      const activities = [{ color: 'red', id: '123', name: 'hello' }];
      const action = ActivityManagementActions.updateActivitySuccess({ activities });
      const result = reducer(initialState, action);
      expect(result.activities).toBe(activities);
    });

    it('should handle success and set currentlySelected', () => {
      const activities = [{ color: 'red', id: '123', name: 'hello' }];
      const currentlySelected = { color: 'green', id: '12356', name: 'hello2' };
      const action = ActivityManagementActions.updateActivitySuccess({ activities, currentlySelected });
      const result = reducer(initialState, action);
      expect(result.activities).toBe(activities);
      expect(result.currentlySelectedActivity).toEqual(currentlySelected);
    });

    it('should handle error', () => {
      const action = ActivityManagementActions.updateActivityFailure({ error: 'error thrown' });
      const result = reducer(initialState, action);
      expect(result.error).toBe('error thrown');
    });
  });

  describe('Delete activities', () => {
    it('should handle success', () => {
      const activities = [{ color: 'red', id: '123', name: 'hello' }];
      const action = ActivityManagementActions.deleteActivitySuccess({ activities });
      const result = reducer(initialState, action);
      expect(result.activities).toBe(activities);
    });

    it('should handle success and remove currentlySelected', () => {
      const activities = [{ color: 'red', id: '123', name: 'hello' }];
      const currentlySelected = { color: 'green', id: '12356', name: 'hello2' };
      const action = ActivityManagementActions.deleteActivitySuccess({ activities, currentlySelected });
      const result = reducer({ ...initialState, currentlySelectedActivity: currentlySelected }, action);
      expect(result.activities).toBe(activities);
      expect(result.currentlySelectedActivity).toBeUndefined();
    });

    it('should handle error', () => {
      const action = ActivityManagementActions.deleteActivityFailure({ error: 'error thrown' });
      const result = reducer(initialState, action);
      expect(result.error).toBe('error thrown');
    });
  });

  describe('Set currentlySelected', () => {
    it('should set currently selected', () => {
      const currentlySelectedActivity = { color: 'red', id: '123', name: 'hello' };
      const action = ActivityManagementActions.setCurrentlySelectedActivity({ currentlySelectedActivity });
      const result = reducer(initialState, action);
      expect(result.currentlySelectedActivity).toBe(currentlySelectedActivity);
    });

    it('should unset currently selected', () => {
      const currentlySelectedActivity = { color: 'red', id: '123', name: 'hello' };
      const action = ActivityManagementActions.unselectIfCurrentlySelectedActivity({ currentlySelectedActivity });
      const result = reducer({ ...initialState, currentlySelectedActivity }, action);
      expect(result.currentlySelectedActivity).toBeUndefined();
    });
  });
});
