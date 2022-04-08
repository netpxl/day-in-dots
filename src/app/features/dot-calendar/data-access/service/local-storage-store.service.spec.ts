import { TestBed, waitForAsync } from '@angular/core/testing';
import { DayBoardInterface } from '@core/interface/day-board.interface';

import { LocalStorageStoreService } from './local-storage-store.service';

describe('LocalStorageStoreService', () => {
  let service: LocalStorageStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should persist data into localStorage with generated UUID ID', waitForAsync(() => {
    const setItemSpy = spyOn(localStorage, 'setItem');
    const board = { slots: [1, 2, 3, 4], board: [[{}]] } as DayBoardInterface;
    service.persistData(board).subscribe((response) => {
      const storageArgs = setItemSpy.calls.argsFor(0)[1];
      expect(JSON.stringify(response)).toEqual(storageArgs);
      expect(typeof response.id === 'string').toBe(true);
      expect(response.slots.length).toEqual(4);
    });
  }));

  it('should persist data into localStorage with  information stripped of dot', waitForAsync(() => {
    const setItemSpy = spyOn(localStorage, 'setItem');
    const board = { slots: [1, 2, 3, 4], board: [[{ name: 'Hmm', activityId: 'test', color: 'useless' }]] } as DayBoardInterface;
    service.persistData(board).subscribe((response) => {
      const storageArgs = setItemSpy.calls.argsFor(0)[1];
      expect(JSON.stringify(response)).toEqual(storageArgs);
      expect(response.board[0][0].color).toBeUndefined();
      expect(response.board[0][0].name).toBeUndefined();
      expect(response.board[0][0].activityId).toBe('test');
      expect(typeof response.id === 'string').toBe(true);
      expect(response.slots.length).toEqual(4);
    });
  }));

  it('should return undefined if no board is in storage', waitForAsync(() => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    service.loadDotCalendar('').subscribe((response) => expect(response).toBeUndefined());
  }));

  it('should return board if it is in storage', waitForAsync(() => {
    const board = { slots: [1, 2, 3, 4], board: [[{ name: 'Hmm', activityId: 'test', color: 'color' }]] } as DayBoardInterface;
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(board));
    service.loadDotCalendar('').subscribe((response) => expect(response).toEqual(board));
  }));
});
