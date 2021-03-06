import { TestBed } from '@angular/core/testing';
import { AnalyticsInterface } from '@core/interface/analytics.interface';
import { DayBoardInterface } from '@core/interface/day-board.interface';
import { DotInterface } from '@core/interface/dot.interface';
import { selectStateDotCalendar } from '@dot-calendar/data-access/store/dot-calendar.selectors';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { take } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { AnalyticsService } from './analytics.service';

function spreadDataAcrossArray(data: DotInterface[]) {
  const nestedArray = Array<Array<DotInterface>>();
  data.forEach((entry) => {
    const row = Math.floor(Math.random() * 20);
    let col = Math.floor(Math.random() * 10);
    nestedArray[row] = nestedArray[row] ?? [];
    while (nestedArray[row][col]) {
      col++;
    }
    nestedArray[row][col] = entry;
  });
  return nestedArray;
}

function generateRandomDots(amount = 0) {
  const dots: DotInterface[] = [];
  for (let i = 0; i < amount; i++) {
    dots.push({
      activityId: uuidv4(),
      name: uuidv4(),
    });
  }
  return dots;
}

describe('AnalyticsService', () => {
  let service: AnalyticsService;
  let store: MockStore;
  const mockDots: DotInterface[] = generateRandomDots(10);
  const dotCollection = new Map<string, AnalyticsInterface>();
  const mockBoard: DayBoardInterface = {
    id: '',
    hours: [],
    slots: [],
    board: [],
    date: '',
  };

  const initialState = {
    dotCalendar: {
      currentDotCalendar: mockBoard,
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({ initialState }),
      ],
    });
    service = TestBed.inject(AnalyticsService);
    store = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have correct amount of data in results without duplicates', async () => {
    store.overrideSelector(
      selectStateDotCalendar,
      { ...mockBoard, board: [mockDots] },
    );
    service.prepareAnalyticData().pipe(take(1)).subscribe((result) => {
      expect(result.length).toEqual(10);
      store.resetSelectors();
    });
    mockBoard.board = spreadDataAcrossArray(mockDots);
  });

  it('should dont do anything if config was not found', async () => {
    store.overrideSelector(
      selectStateDotCalendar,
      undefined,
    );
    service.prepareAnalyticData().pipe(take(1)).subscribe((result) => {
      expect(result.length).toEqual(0);
      store.resetSelectors();
    });
  });

  it('should have correct amount of data in results with duplicates', async () => {
    store.overrideSelector(
      selectStateDotCalendar,
      { ...mockBoard, board: [[...mockDots.slice(0, 2), mockDots[3], mockDots[3]]] },
    );
    service.prepareAnalyticData().pipe(take(1)).subscribe((result) => {
      expect(result.length).toEqual(3);
      store.resetSelectors();
    });

    mockBoard.board = spreadDataAcrossArray(
      [
        mockDots[0],
        mockDots[0],
        mockDots[2],
        mockDots[0],
        mockDots[5],
      ],
    );
  });

  it('should add dots correctly', () => {
    service.handleSingleDotInMap(dotCollection, mockDots[0]);
    const result = dotCollection.get(mockDots[0].activityId || '');
    expect(result).toBeTruthy();
    expect(result?.slotsUsed).toBe(1);

    service.handleSingleDotInMap(dotCollection, mockDots[0]);
    const resultAdding = dotCollection.get(mockDots[0].activityId || '');
    expect(resultAdding).toBeTruthy();
    expect(resultAdding?.slotsUsed).toBe(2);

    service.handleSingleDotInMap(dotCollection, mockDots[1]);
    const resultUnrelatedDot = dotCollection.get(mockDots[1].activityId || '');
    const resultOldDot = dotCollection.get(mockDots[0].activityId || '');
    expect(resultUnrelatedDot).toBeTruthy();
    expect(resultUnrelatedDot?.slotsUsed).toBe(1);
    expect(resultOldDot?.slotsUsed).toBe(2);
  });
});
