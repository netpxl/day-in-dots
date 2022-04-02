import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockProvider } from 'ng-mocks';
import { ReplaySubject } from 'rxjs';
import { ActivityInterface } from 'src/app/core/interface/activity.interface';
import { DayBoardInterface } from 'src/app/core/interface/day-board.interface';
import { DotInterface } from 'src/app/core/interface/dot.interface';
import { StoreService } from 'src/app/shared/services/store.service.abstract';
import { DotCalendarService } from '../../service/dot-calendar.service';
import { DatepickerComponent } from '../datepicker/datepicker.component';

import { DotCalendarComponent } from './dot-calendar.component';

describe('DotCalendarComponent', () => {
  let component: DotCalendarComponent;
  let fixture: ComponentFixture<DotCalendarComponent>;
  let storeService: StoreService;
  let dotCalendarService: DotCalendarService;
  const configSubject: ReplaySubject<DayBoardInterface | undefined> = new ReplaySubject();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DotCalendarComponent, DatepickerComponent],
      providers: [
        MockProvider(StoreService),
        MockProvider(DotCalendarService),
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DotCalendarComponent);
    component = fixture.componentInstance;
    storeService = TestBed.inject(StoreService);
    dotCalendarService = TestBed.inject(DotCalendarService);
    storeService.config$ = configSubject;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create new calendar if config is empty', () => {
    dotCalendarService.generateNewDayBoard = jasmine.createSpy().and.callFake(() => ({ id: 'test' } as any as DayBoardInterface));
    configSubject.next(undefined);
    expect(dotCalendarService.generateNewDayBoard).toHaveBeenCalled();
    expect(component.config?.id).toBe('test');
  });

  it('should set calendar if config is not empty', () => {
    dotCalendarService.generateNewDayBoard = jasmine.createSpy().and.callThrough();
    configSubject.next({ id: 'testFromConfig', slots: [0], hours: [0] } as any as DayBoardInterface);
    expect(dotCalendarService.generateNewDayBoard).not.toHaveBeenCalled();
    expect(component.config?.id).toBe('testFromConfig');
  });

  it('should init new board load on changed date', () => {
    const storeDateSpy = spyOn(storeService, 'loadDotCalendar').and.callFake(() => {});
    component.onDateChanged('12-12-2012');
    expect(storeDateSpy).toHaveBeenCalledOnceWith('12-12-2012');
    expect((component as any)._currentDate).toEqual('12-12-2012');
  });

  it('should ignore clicks if config is not found', () => {
    storeService.currentlySelectedActivitiy = undefined;
    component.config = undefined;

    component.handleClickedDot(0, 0);
    expect(component.config).toBeUndefined();
  });

  it('should unselected clicked dot if no activity selected', () => {
    storeService.currentlySelectedActivitiy = undefined;
    component.config = {
      hours: [0],
      slots: [0],
      board: { 0: { 0: { color: 'test', activityId: 'test' } as DotInterface } },
    } as any as DayBoardInterface;

    component.handleClickedDot(0, 0);
    expect(component.config?.board[0][0].activityId).toBeFalsy();
    expect(component.config?.board[0][0].color).toBeFalsy();
  });

  it('should unselected clicked dot if selected activity is same as clicked', () => {
    storeService.currentlySelectedActivitiy = { color: 'test', id: 'test' } as any as ActivityInterface;
    component.config = {
      hours: [0],
      slots: [0],
      board: { 0: { 0: { color: 'test', activityId: 'test' } as DotInterface } },
    } as any as DayBoardInterface;

    component.handleClickedDot(0, 0);
    expect(component.config?.board[0][0].activityId).toBeFalsy();
    expect(component.config?.board[0][0].color).toBeFalsy();
  });

  it('should select clicked dot', () => {
    storeService.currentlySelectedActivitiy = { color: 'test', id: 'test' } as any as ActivityInterface;
    component.config = {
      hours: [0, 1],
      slots: [0, 1],
      board: { 0: { 0: { id: '' } as DotInterface } },
    } as any as DayBoardInterface;

    component.handleClickedDot(0, 0);
    expect(component.config?.board[0][0].activityId).toBe('test');
    expect(component.config?.board[0][0].color).toBe('test');
  });

  it('should overwrite clicked dot', () => {
    storeService.currentlySelectedActivitiy = { color: 'test', id: 'test' } as any as ActivityInterface;
    component.config = {
      hours: [0],
      slots: [0],
      board: { 0: { 0: { color: 'test2', activityId: 'test2' } as DotInterface } },
    } as any as DayBoardInterface;

    component.handleClickedDot(0, 0);
    expect(component.config?.board[0][0].activityId).toBe('test');
    expect(component.config?.board[0][0].color).toBe('test');
  });
});
