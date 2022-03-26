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
});
