import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivityInterface } from '@core/interface/activity.interface';
import { DayBoardInterface } from '@core/interface/day-board.interface';
import { DotInterface } from '@core/interface/dot.interface';
import { StoreService } from '@dot-calendar/data-access/service/store.service.abstract';
import { loadDotCalendar, saveDotCalendar } from '@dot-calendar/data-access/store/dot-calendar.actions';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MockComponent, MockProvider } from 'ng-mocks';
import { of } from 'rxjs';
import { DotCalendarService } from '../../../data-access/service/dot-calendar.service';
import { DatepickerComponent } from '../datepicker/datepicker.component';

import { DotCalendarComponent } from './dot-calendar.component';

describe('DotCalendarComponent', () => {
  let component: DotCalendarComponent;
  let fixture: ComponentFixture<DotCalendarComponent>;
  let store: MockStore;
  let dotCalendarService: DotCalendarService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DotCalendarComponent, MockComponent(DatepickerComponent)],
      providers: [
        MockProvider(StoreService),
        MockProvider(DotCalendarService),
        provideMockStore(),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DotCalendarComponent);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    dotCalendarService = TestBed.inject(DotCalendarService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set calendar if config is not empty', () => {
    dotCalendarService.generateNewDayBoard = jasmine.createSpy().and.callThrough();
    spyOn(store, 'select').and.returnValue(of({ id: 'testFromConfig' }));
    component.ngOnInit();
    expect(dotCalendarService.generateNewDayBoard).not.toHaveBeenCalled();
    expect(component.config?.id).toBe('testFromConfig');
  });

  it('should init new board load on changed date', () => {
    const storeDateSpy = spyOn(store, 'dispatch').and.callFake(() => {});
    component.onDateChanged('12-12-2012');
    expect(storeDateSpy).toHaveBeenCalledOnceWith(loadDotCalendar({ requestedDate: '12-12-2012' }));
    expect((component as any)._currentDate).toEqual('12-12-2012');
  });

  it('should ignore clicks if config is not found', () => {
    (component as any)._currentlySelectedActivity = undefined;
    component.config = undefined;

    component.handleClickedDot(0, 0);
    expect(component.config).toBeUndefined();
  });

  it('should unselected clicked dot if no activity selected', () => {
    const storeBoardSpy = spyOn(store, 'dispatch').and.callFake(() => {});
    (component as any)._currentlySelectedActivity = undefined;
    component.config = {
      hours: [0],
      slots: [0],
      board: { 0: { 0: { color: 'test', activityId: 'test' } as DotInterface } },
    } as any as DayBoardInterface;

    const resultConfig = JSON.parse(JSON.stringify(component.config));
    delete resultConfig.board[0][0].color;
    delete resultConfig.board[0][0].activityId;
    component.handleClickedDot(0, 0);
    expect(storeBoardSpy).toHaveBeenCalledOnceWith(saveDotCalendar({ dotCalendar: resultConfig }));
  });

  it('should unselected clicked dot if selected activity is same as clicked', () => {
    const storeBoardSpy = spyOn(store, 'dispatch').and.callFake(() => {});
    (component as any)._currentlySelectedActivity = { color: 'test', id: 'test' } as any as ActivityInterface;
    component.config = {
      hours: [0],
      slots: [0],
      board: { 0: { 0: { color: 'test', activityId: 'test' } as DotInterface } },
    } as any as DayBoardInterface;

    const resultConfig = JSON.parse(JSON.stringify(component.config));
    delete resultConfig.board[0][0].color;
    delete resultConfig.board[0][0].activityId;
    component.handleClickedDot(0, 0);
    expect(storeBoardSpy).toHaveBeenCalledOnceWith(saveDotCalendar({ dotCalendar: resultConfig }));
  });

  it('should select clicked dot', () => {
    const storeBoardSpy = spyOn(store, 'dispatch').and.callFake(() => {});
    (component as any)._currentlySelectedActivity = { color: 'test', id: 'test' } as any as ActivityInterface;
    component.config = {
      hours: [0, 1],
      slots: [0, 1],
      board: { 0: { 0: { } as DotInterface } },
    } as any as DayBoardInterface;

    const resultConfig = JSON.parse(JSON.stringify(component.config));
    resultConfig.board[0][0].color = 'test';
    resultConfig.board[0][0].activityId = 'test';
    resultConfig.board[0][0].name = undefined;
    component.handleClickedDot(0, 0);
    expect(storeBoardSpy).toHaveBeenCalledOnceWith(saveDotCalendar({ dotCalendar: resultConfig }));
  });

  it('should overwrite clicked dot', () => {
    const storeBoardSpy = spyOn(store, 'dispatch').and.callFake(() => {});
    (component as any)._currentlySelectedActivity = { color: 'test', id: 'test' } as any as ActivityInterface;
    component.config = {
      hours: [0],
      slots: [0],
      board: { 0: { 0: { color: 'test2', activityId: 'test2' } as DotInterface } },
    } as any as DayBoardInterface;

    const resultConfig = JSON.parse(JSON.stringify(component.config));
    resultConfig.board[0][0].color = 'test';
    resultConfig.board[0][0].activityId = 'test';
    resultConfig.board[0][0].name = undefined;
    component.handleClickedDot(0, 0);
    expect(storeBoardSpy).toHaveBeenCalledOnceWith(saveDotCalendar({ dotCalendar: resultConfig }));
  });
});
