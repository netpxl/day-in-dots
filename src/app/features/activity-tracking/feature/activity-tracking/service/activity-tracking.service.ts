import { Injectable } from '@angular/core';
import { ActivityInterface } from 'src/app/core/interface/activity.interface';
import { DotInterface } from 'src/app/core/interface/dot.interface';

@Injectable({
  providedIn: 'root',
})
export class ActivityTrackingService {
  private _timeSlotInMinutes = 3;

  private _activityTrack: (DotInterface & { hour: number, slot: number })[] = [];

  private _currentActivity?: { activity: ActivityInterface, time: number };

  get timeSlotInMinutes(): number {
    return this._timeSlotInMinutes;
  }

  set timeSlotInMinutes(value: number) {
    this._timeSlotInMinutes = value;
  }

  get activityTrack(): DotInterface[] {
    return this._activityTrack;
  }

  handleActivityChange(activity?: ActivityInterface) {
    const now = Date.now();
    if (this._currentActivity) {
      const beginningTimeslot = this._findClosestInterval(this._currentActivity.time);
      const endingTimeslot = this._findClosestInterval(now);
      this._writeActivityToTrack(beginningTimeslot, endingTimeslot);
    }

    if (!activity) {
      return;
    }

    this._currentActivity = { activity, time: now };
  }

  _findClosestInterval(timestamp: number): { hour: number, slot: number } {
    const date = new Date(timestamp);
    const timeToNextInterval = this._timeSlotInMinutes - Math.ceil((date.getMinutes() % this._timeSlotInMinutes));
    const currentIntervalUsed = timeToNextInterval > Math.ceil(this._timeSlotInMinutes / 2);
    let hour = date.getHours();
    let slot = date.getMinutes() - (this._timeSlotInMinutes - timeToNextInterval);
    if (!currentIntervalUsed) {
      slot += this._timeSlotInMinutes;
      if (slot > 60 - this._timeSlotInMinutes) {
        slot = 0;
        hour = hour + 1 >= 24 ? 0 : hour + 1;
      }
    }
    return { hour, slot };
  }

  _writeActivityToTrack(beginningTimeslot: { hour: number, slot: number }, endingTimeslot: { hour: number, slot: number }) {
    if (!this._currentActivity) {
      return;
    }
    while (
      beginningTimeslot.hour < endingTimeslot.hour
      || (
        beginningTimeslot.hour === endingTimeslot.hour
        && beginningTimeslot.slot < endingTimeslot.slot
      )
    ) {
      this._activityTrack.push({
        id: '',
        color: this._currentActivity.activity.color,
        name: this._currentActivity.activity.name,
        hour: beginningTimeslot.hour,
        slot: beginningTimeslot.slot,
      });

      beginningTimeslot.slot += this._timeSlotInMinutes;
      if (beginningTimeslot.slot > 60 - this._timeSlotInMinutes) {
        beginningTimeslot.slot = 0;
        beginningTimeslot.hour = beginningTimeslot.hour + 1 >= 24 ? 0 : beginningTimeslot.hour + 1;
      }
    }
  }
}
