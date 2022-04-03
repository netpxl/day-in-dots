import { TestBed } from '@angular/core/testing';
import { MockProvider } from 'ng-mocks';
import { ReplaySubject, take } from 'rxjs';
import { AnalyticsInterface } from 'src/app/core/interface/analytics.interface';
import { DayBoardInterface } from 'src/app/core/interface/day-board.interface';
import { DotInterface } from 'src/app/core/interface/dot.interface';
import { StoreService } from 'src/app/shared/services/store.service.abstract';
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
      id: uuidv4(),
      activityId: uuidv4(),
      name: uuidv4(),
    });
  }
  return dots;
}

describe('AnalyticsService', () => {
  let service: AnalyticsService;
  let storeService: StoreService;
  const mockDots: DotInterface[] = generateRandomDots(10);
  const dotCollection = new Map<string, AnalyticsInterface>();
  const mockBoard: DayBoardInterface = {
    id: '',
    hours: [],
    slots: [],
    board: [],
    date: '',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockProvider(StoreService),
      ],
    });
    service = TestBed.inject(AnalyticsService);
    storeService = TestBed.inject(StoreService);
    storeService.config$ = new ReplaySubject();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have correct amount of data in results without duplicates', async () => {
    service.prepareAnalyticData().pipe(take(1)).subscribe((result) => {
      expect(result.length).toEqual(10);
    });
    mockBoard.board = spreadDataAcrossArray(mockDots);
    storeService.config$.next(mockBoard);
  });

  it('should have correct amount of data in results with duplicates', async () => {
    service.prepareAnalyticData().pipe(take(1)).subscribe((result) => {
      expect(result.length).toEqual(3);
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
    storeService.config$.next(mockBoard);
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
