import { TestBed, waitForAsync } from '@angular/core/testing';
import { ActivityDtoInterface } from '@core/interface/activity-dto.interface';
import { ActivityInterface } from '@core/interface/activity.interface';
import { of } from 'rxjs';

import { LocalStorageStoreService } from './local-storage-store.service';

describe('LocalStorageStoreService', () => {
  let service: LocalStorageStoreService;
  const activitiesMock: ActivityInterface[] = [{ color: 'red' }, { color: 'blue' }] as ActivityInterface[];
  const activitiesMockWithId = [{ ...activitiesMock[0], id: '1234' }, { ...activitiesMock[1], id: '123' }];
  let getActivitiesSpy: jasmine.Spy;
  let setItemSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageStoreService);
    getActivitiesSpy = spyOn((service as any), '_getActivities').and.callThrough();
    setItemSpy = spyOn(localStorage, 'setItem');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return empty array if no activities in storage', waitForAsync(() => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    service.getActivities().subscribe((result) => expect(result).toEqual([]));
  }));

  it('should return activities array if activities in storage', waitForAsync(() => {
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(activitiesMock));
    service.getActivities().subscribe((result) => expect(result).toEqual(activitiesMock));
  }));

  it('should save new activity, add id and return new list of activities', waitForAsync(() => {
    getActivitiesSpy.and.returnValue(activitiesMock);

    const fakeNewActivity: Omit<ActivityInterface, 'id'> = { color: 'violet', name: 'iamnew' };
    service.saveActivity(fakeNewActivity).subscribe((response) => {
      const storageArgs = setItemSpy.calls.argsFor(0)[1];
      expect(JSON.stringify(response.activities)).toEqual(storageArgs);
      expect(response.activities.length).toBe(3);
      expect(response.activities[0].color).toBe('red');
      expect(response.activities[2].color).toBe('violet');
      expect(response.activities[2].name).toBe('iamnew');
      expect(getActivitiesSpy).toHaveBeenCalledTimes(1);
    });
  }));

  it('should save updated activity and return new list of activities', waitForAsync(() => {
    getActivitiesSpy.and.returnValue(JSON.parse(JSON.stringify(activitiesMockWithId)));
    const fakeUpdateActivity: ActivityInterface = { id: '123', color: 'violet', name: 'iamnew' };
    service.updateActivity(fakeUpdateActivity).subscribe((response) => {
      const storageArgs = setItemSpy.calls.argsFor(0)[1];
      expect(JSON.stringify(response.activities)).toEqual(storageArgs);
      expect(response.activities.length).toBe(2);
      expect(response.activities[0].color).toBe('red');
      expect(response.activities[1].color).toBe('violet');
      expect(response.activities[1].name).toBe('iamnew');
      expect(getActivitiesSpy).toHaveBeenCalledTimes(1);
    });
  }));

  it('should save new activity if updated activity is not in activity list yet and return new list of activities', waitForAsync(() => {
    getActivitiesSpy.and.returnValue(JSON.parse(JSON.stringify(activitiesMockWithId)));
    const createNewActivitySpy = spyOn(service, 'saveActivity').and.returnValue(of({} as ActivityDtoInterface));
    const fakeUpdateActivity: ActivityInterface = { id: '12345', color: 'violet', name: 'iamnew' };
    service.updateActivity(fakeUpdateActivity).subscribe(() => {
      expect(createNewActivitySpy).toHaveBeenCalledTimes(1);
      expect(getActivitiesSpy).toHaveBeenCalledTimes(1);
    });
  }));

  it('should delete activity and return new list of activities', waitForAsync(() => {
    getActivitiesSpy.and.returnValue(JSON.parse(JSON.stringify(activitiesMockWithId)));
    const fakeDeleteActivity: ActivityInterface = { id: '1234', color: 'violet', name: 'iamnew' };
    service.deleteActivity(fakeDeleteActivity).subscribe((response) => {
      const storageArgs = setItemSpy.calls.argsFor(0)[1];
      expect(JSON.stringify(response.activities)).toEqual(storageArgs);
      expect(response.activities.length).toBe(1);
      expect(response.activities[0].id).toBe('123');
      expect(response.activities[0].color).toBe('blue');
      expect(getActivitiesSpy).toHaveBeenCalledTimes(1);
    });
  }));
});
