import { TestBed } from '@angular/core/testing';
import { ActivityInterface } from '@core/interface/activity.interface';
import { StoreService } from '@dot-calendar/data-access/service/store.service.abstract';
import { MockProvider } from 'ng-mocks';

import { ActivityTrackingService } from './activity-tracking.service';

describe('ActivityTrackingService', () => {
  let service: ActivityTrackingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MockProvider(StoreService)],
    });
    service = TestBed.inject(ActivityTrackingService);
    service.timeSlotInMinutes = 10;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(service.timeSlotInMinutes).toEqual(10);
  });

  describe('findClosestInterval', () => {
    it('should find closest interval correctly', () => {
      let result;
      let date;

      date = new Date('12.12.2012 08:40');
      result = service._findClosestInterval(date.getTime());
      expect(result.hour).toEqual(8);
      expect(result.slot).toEqual(40);

      date = new Date('12.12.2012 08:34');
      result = service._findClosestInterval(date.getTime());
      expect(result.hour).toEqual(8);
      expect(result.slot).toEqual(30);

      date = new Date('12.12.2012 08:36');
      result = service._findClosestInterval(date.getTime());
      expect(result.hour).toEqual(8);
      expect(result.slot).toEqual(40);

      date = new Date('12.12.2012 23:55');
      result = service._findClosestInterval(date.getTime());
      expect(result.hour).toEqual(0);
      expect(result.slot).toEqual(0);
    });
  });

  describe('writeActivityToTrack', () => {
    let beginningTimeslot = { hour: 15, slot: 10 };

    beforeEach(() => {
      beginningTimeslot = { hour: 15, slot: 10 };
      (service as any)._activityTrack = [];
    });

    it('should return if no current activity', () => {
      (service as any)._currentActivity = undefined;
      service._writeActivityToTrack(beginningTimeslot, { hour: 15, slot: 40 });
      expect(service.activityTrack.length).toBe(0);
    });

    it('should handle multipe entries in same hour correctly', () => {
      (service as any)._currentActivity = { activity: { color: '', name: '' } as ActivityInterface, time: Date.now() };
      const endingTimeslot = { hour: 15, slot: 40 };
      service._writeActivityToTrack(beginningTimeslot, endingTimeslot);
      expect(service.activityTrack.length).toBe(3);
    });

    it('should handle multipe entries across various hours correctly', () => {
      (service as any)._currentActivity = { activity: { color: '', name: '' } as ActivityInterface, time: Date.now() };
      const endingTimeslot = { hour: 16, slot: 40 };
      service._writeActivityToTrack(beginningTimeslot, endingTimeslot);
      expect(service.activityTrack.length).toBe(9);
    });

    it('should handle multipe entries across various hours correctly', () => {
      (service as any)._currentActivity = { activity: { color: '', name: '' } as ActivityInterface, time: Date.now() };
      beginningTimeslot = { hour: 0, slot: 0 };
      const endingTimeslot = { hour: 16, slot: 40 };
      service._writeActivityToTrack(beginningTimeslot, endingTimeslot);
      expect(service.activityTrack.length).toBe(100);
    });

    it('should handle multipe entries across various hours correctly', () => {
      (service as any)._currentActivity = { activity: { color: '', name: '' } as ActivityInterface, time: Date.now() };
      beginningTimeslot = { hour: 0, slot: 0 };
      const endingTimeslot = { hour: 21, slot: 40 };
      service._writeActivityToTrack(beginningTimeslot, endingTimeslot);
      expect(service.activityTrack.length).toBe(130);
    });

    it('should not add anything if end is before start', () => {
      (service as any)._currentActivity = { activity: { color: '', name: '' } as ActivityInterface, time: Date.now() };
      beginningTimeslot = { hour: 21, slot: 0 };
      const endingTimeslot = { hour: 5, slot: 40 };
      service._writeActivityToTrack(beginningTimeslot, endingTimeslot);
      expect(service.activityTrack.length).toBe(0);
    });
  });

  describe('handleActivityChange', () => {
    let dateSpy: jasmine.Spy;

    beforeEach(() => {
      dateSpy = spyOn(Date, 'now').and.returnValue(187);
    });

    it('should set passed in as currentActive with timestamp', () => {
      const fakeActivity: ActivityInterface = { id: '123' } as ActivityInterface;
      (service as any)._currentActivity = undefined;
      service.handleActivityChange(fakeActivity);
      expect((service as any)._currentActivity).toEqual({ activity: fakeActivity, time: 187 });
      expect(dateSpy).toHaveBeenCalledTimes(1);
    });

    it('should not set currentActivity if no activity passed in', () => {
      const fakeActivity: ActivityInterface = { id: '123' } as ActivityInterface;
      (service as any)._currentActivity = fakeActivity;
      service.handleActivityChange(undefined);
      expect((service as any)._currentActivity).toEqual(fakeActivity);
    });

    it('should write activity to track if currentActivity is set', () => {
      const fakeActivity: ActivityInterface = { id: '123' } as ActivityInterface;
      const closestIntervalSpy = spyOn(service, '_findClosestInterval').and.returnValue({ hour: 0, slot: 0 });
      const writerSpy = spyOn(service, '_writeActivityToTrack').and.returnValue();
      (service as any)._currentActivity = { activity: fakeActivity, time: 187 };
      service.handleActivityChange(undefined);
      expect(closestIntervalSpy).toHaveBeenCalledTimes(2);
      expect(writerSpy).toHaveBeenCalledOnceWith({ hour: 0, slot: 0 }, { hour: 0, slot: 0 });
    });
  });
});
