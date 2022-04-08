import { DayBoardInterface } from '@core/interface/day-board.interface';
import { DotInterface } from '@core/interface/dot.interface';
import { reducer, initialState } from './dot-calendar.reducer';
import * as DotCalendarActions from './dot-calendar.actions';

describe('ActivityManagement Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  describe('Loading Calendar', () => {
    it('should handle success', () => {
      const dotCalendar: DayBoardInterface = {
        id: '123', hours: [], date: '1232', slots: [], board: [[{} as DotInterface]],
      };
      const action = DotCalendarActions.loadDotCalendarSuccess({ dotCalendar });
      const result = reducer(initialState, action);
      expect(result.currentDotCalendar).toBe(dotCalendar);
    });

    it('should handle error', () => {
      const action = DotCalendarActions.loadDotCalendarFailure({ error: 'error thrown' });
      const result = reducer(initialState, action);
      expect(result.error).toBe('error thrown');
    });
  });
});
