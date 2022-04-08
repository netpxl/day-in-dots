import { ActivityInterface } from '@core/interface/activity.interface';
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

describe('createActivity', () => {
  it('should return an action - init', () => {
    expect(fromActivityManagment.createActivity({ activity: {} as ActivityInterface }).type).toBe('[ActivityManagment] Create Activity');
  });

  it('should return an action - success', () => {
    expect(fromActivityManagment.createActivitySuccess({ activities: [{} as ActivityInterface] }).type)
      .toBe('[ActivityManagment] Create Activity Success');
  });

  it('should return an action - failure', () => {
    expect(fromActivityManagment.createActivityFailure({ error: '' }).type).toBe('[ActivityManagment] Create Activity Failure');
  });
});

describe('updateActivity', () => {
  it('should return an action - init', () => {
    expect(fromActivityManagment.updateActivity({ activity: {} as ActivityInterface }).type).toBe('[ActivityManagment] Update Activity');
  });

  it('should return an action - success', () => {
    expect(fromActivityManagment.updateActivitySuccess({ activities: [{} as ActivityInterface] }).type)
      .toBe('[ActivityManagment] Update Activity Success');
  });

  it('should return an action - failure', () => {
    expect(fromActivityManagment.updateActivityFailure({ error: '' }).type).toBe('[ActivityManagment] Update Activity Failure');
  });
});

describe('deleteActivity', () => {
  it('should return an action - init', () => {
    expect(fromActivityManagment.deleteActivity({ activity: {} as ActivityInterface }).type).toBe('[ActivityManagment] Delete Activity');
  });

  it('should return an action - success', () => {
    expect(fromActivityManagment.deleteActivitySuccess({ activities: [{} as ActivityInterface] }).type)
      .toBe('[ActivityManagment] Delete Activity Success');
  });

  it('should return an action - failure', () => {
    expect(fromActivityManagment.deleteActivityFailure({ error: '' }).type).toBe('[ActivityManagment] Delete Activity Failure');
  });
});

describe('currentlySelectedActivity', () => {
  it('should return an action - select', () => {
    expect(fromActivityManagment.setCurrentlySelectedActivity(
      { currentlySelectedActivity: {} as ActivityInterface },
    ).type).toBe('[ActivityManagment] Set Currently Selected Activity');
  });

  it('should return an action - unselect if equal', () => {
    expect(fromActivityManagment.unselectIfCurrentlySelectedActivity(
      { currentlySelectedActivity: {} as ActivityInterface },
    ).type).toBe('[ActivityManagment] Unselect Activity if Currently Selected Activity');
  });
});
