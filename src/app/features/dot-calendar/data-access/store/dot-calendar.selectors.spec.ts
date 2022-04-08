import { DotInterface } from '@core/interface/dot.interface';
import { DotCalendarState } from './dot-calendar.reducer';
import { selectFeature, selectStateDotCalendar, selectStateError } from './dot-calendar.selectors';

describe('DotCalendar Selectors', () => {
  const startingState: DotCalendarState = { };
  startingState.currentDotCalendar = {
    id: '123',
    hours: [],
    slots: [],
    date: '',
    board: [[{} as DotInterface]],
  };
  startingState.error = 'error';
  const fullState = { dotCalendar: startingState };

  it('should select the feature state', () => {
    expect(selectFeature(fullState)).toEqual(startingState);
  });

  it('should select the current dot calendar', () => {
    expect(selectStateDotCalendar(fullState)).toEqual(startingState.currentDotCalendar);
  });

  it('should select the error', () => {
    expect(selectStateError(fullState)).toEqual('error');
  });
});
