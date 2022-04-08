import { TestBed } from '@angular/core/testing';
import { ActivityInterface } from '@core/interface/activity.interface';
import { DayBoardInterface } from '@core/interface/day-board.interface';

import { DotCalendarService } from './dot-calendar.service';

describe('DotCalendarService', () => {
  let service: DotCalendarService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DotCalendarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should generate a new day entry', () => {
    const result = service.generateNewDayBoard('2020-12-12');
    expect(result.date).toEqual('2020-12-12');
    expect(result.hours.length).toEqual(24);
    expect(result.slots.length).toEqual(4);
    expect(result.board.length).toEqual(24);
    expect(result.board[0].length).toEqual(4);
  });

  it('should generate a new day entry with custom slots', () => {
    const result = service.generateNewDayBoard('2020-12-12', 10);
    expect(result.date).toEqual('2020-12-12');
    expect(result.hours.length).toEqual(24);
    expect(result.slots.length).toEqual(6);
    expect(result.board.length).toEqual(24);
    expect(result.board[0].length).toEqual(6);
  });

  it('should loop through board and merge it with activities', () => {
    const activities: ActivityInterface[] = [
      { id: 'test', color: 'test', name: 'test' },
      { id: 'test2', color: 'test2', name: 'test2' },
    ];
    const board: DayBoardInterface = {
      board: [
        [{ activityId: 'test' }, { activityId: 'hmm' }],
      ],
    } as DayBoardInterface;

    const result = service.mergeWithActivites(board, activities);
    expect(result.board[0][0].activityId).toEqual('test');
    expect(result.board[0][0].name).toEqual('test');
    expect(result.board[0][0].color).toEqual('test');
    expect(result.board[0][1].color).toBeUndefined();
  });

  it('should loop through board and remove activities not found', () => {
    const activities: ActivityInterface[] = [
      { id: 'test', color: 'test', name: 'test' },
      { id: 'test2', color: 'test2', name: 'test2' },
    ];
    const board: DayBoardInterface = {
      board: [
        [{ activityId: 'test' }, { activityId: 'hmm', color: 'red' }],
      ],
    } as DayBoardInterface;

    const result = service.mergeWithActivites(board, activities);
    expect(result.board[0][1].color).toBeUndefined();
  });
});
