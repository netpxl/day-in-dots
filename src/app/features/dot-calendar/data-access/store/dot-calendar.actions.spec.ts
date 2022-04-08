import { DayBoardInterface } from '@core/interface/day-board.interface';
import * as fromDotCalendar from './dot-calendar.actions';

describe('loadDotCalendar', () => {
  it('should return an action - init', () => {
    expect(fromDotCalendar.loadDotCalendar({ requestedDate: '' }).type).toBe('[DotCalendar] Load DotCalendar');
  });

  it('should return an action - success', () => {
    expect(fromDotCalendar.loadDotCalendarSuccess({ dotCalendar: {} as DayBoardInterface }).type)
      .toBe('[DotCalendar] Load DotCalendar Success');
  });

  it('should return an action - init', () => {
    expect(fromDotCalendar.loadDotCalendarFailure({ error: '' }).type).toBe('[DotCalendar] Load DotCalendar Failure');
  });
});

describe('saveDotCalendar', () => {
  it('should return an action - init', () => {
    expect(fromDotCalendar.saveDotCalendar({ dotCalendar: {} as DayBoardInterface }).type).toBe('[DotCalendar] Save DotCalendar');
  });
});
