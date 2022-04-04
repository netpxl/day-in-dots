import { ActivityInterface } from 'src/app/core/interface/activity.interface';
import * as fromActivityManagment from './activity-managment.actions';

describe('loadActivities', () => {
  it('should return an action - init', () => {
    expect(fromActivityManagment.loadActivities().type).toBe('[ActivityManagment] Load Activities');
  });

  it('should return an action - success', () => {
    expect(fromActivityManagment.loadActivitiesSuccess({ activities: [{} as ActivityInterface] }).type)
      .toBe('[ActivityManagment] Load Activities Success');
  });

  it('should return an action - init', () => {
    expect(fromActivityManagment.loadActivitiesFailure({ error: '' }).type).toBe('[ActivityManagment] Load Activities Failure');
  });
});

describe('updateActivity', () => {
  it('should return an action - init', () => {
    expect(fromActivityManagment.createActivity({ activity: {} as ActivityInterface }).type).toBe('[ActivityManagment] Create Activities');
  });

  it('should return an action - success', () => {
    expect(fromActivityManagment.createActivitySuccess({ activities: [{} as ActivityInterface] }).type)
      .toBe('[ActivityManagment] Create Activities Success');
  });

  it('should return an action - init', () => {
    expect(fromActivityManagment.createActivityFailure({ error: '' }).type).toBe('[ActivityManagment] Create Activities Failure');
  });
});

describe('updateActivity', () => {
  it('should return an action - init', () => {
    expect(fromActivityManagment.updateActivity({ activity: {} as ActivityInterface }).type).toBe('[ActivityManagment] Update Activities');
  });

  it('should return an action - success', () => {
    expect(fromActivityManagment.updateActivitySuccess({ activities: [{} as ActivityInterface] }).type)
      .toBe('[ActivityManagment] Update Activities Success');
  });

  it('should return an action - init', () => {
    expect(fromActivityManagment.updateActivityFailure({ error: '' }).type).toBe('[ActivityManagment] Update Activities Failure');
  });
});

describe('deleteActivity', () => {
  it('should return an action - init', () => {
    expect(fromActivityManagment.deleteActivity({ activityId: '' }).type).toBe('[ActivityManagment] Delete Activities');
  });

  it('should return an action - success', () => {
    expect(fromActivityManagment.deleteActivitySuccess({ activities: [{} as ActivityInterface] }).type)
      .toBe('[ActivityManagment] Delete Activities Success');
  });

  it('should return an action - init', () => {
    expect(fromActivityManagment.deleteActivityFailure({ error: '' }).type).toBe('[ActivityManagment] Delete Activities Failure');
  });
});
