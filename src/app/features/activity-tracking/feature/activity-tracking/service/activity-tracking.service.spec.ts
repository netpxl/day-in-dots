import { TestBed } from '@angular/core/testing';
import { MockProvider } from 'ng-mocks';
import { ActivityInterface } from 'src/app/core/interface/activity.interface';
import { StoreService } from 'src/app/shared/services/store.service.abstract';

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
});
