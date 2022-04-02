import { TestBed } from '@angular/core/testing';

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

  it('should generate a new board', () => {
    const result = service.generateNewDayBoard('12-12-12');
    expect(result.slots).toEqual([0, 15, 30, 45]);
    expect(result.hours.length).toBe(24);
    expect(result.hours[0]).toBe(0);
    expect(result.hours[23]).toBe(23);
    expect(result.date).toBe('12-12-12');
    expect(Object.values(result.board).length).toBe(24);
    expect(Object.values(Object.values(result.board)[0]).length).toBe(4);
    expect(Object.values(Object.values(result.board)[5]).length).toBe(4);
    expect(Object.values(Object.values(result.board)[15]).length).toBe(4);
  });
});
