import {
  selectStateActivities,
  selectStateCurrentlySelectedActivity,
} from '@activity-management/data-access/store/activity-management.selectors';
import {
  Component, OnDestroy, OnInit, HostBinding,
} from '@angular/core';
import { ActivityInterface } from '@core/interface/activity.interface';
import { DayBoardInterface } from '@core/interface/day-board.interface';
import { loadDotCalendar, reloadDotCalendar, saveDotCalendar } from '@dot-calendar/data-access/store/dot-calendar.actions';
import { selectStateDotCalendar } from '@dot-calendar/data-access/store/dot-calendar.selectors';
import { Store } from '@ngrx/store';
import { ReplaySubject, takeUntil } from 'rxjs';

@Component({
  selector: 'did-dot-calendar',
  templateUrl: './dot-calendar.component.html',
  styleUrls: ['./dot-calendar.component.scss'],
})
export class DotCalendarComponent implements OnDestroy, OnInit {
  @HostBinding('style.--__columns') columns = 4;

  config?: DayBoardInterface;

  private _currentDate = '';

  private _currentlySelectedActivity?: ActivityInterface | undefined;

  private destroy$ = new ReplaySubject<boolean>();

  constructor(
    private readonly store: Store,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(loadDotCalendar({ requestedDate: this._currentDate }));
    this.store.select(selectStateActivities).subscribe((activities) => {
      this.store.dispatch(reloadDotCalendar({ activities }));
    });

    this.store.select(selectStateDotCalendar).subscribe((response) => {
      this.config = response || undefined;
      if (!this.config) {
        this.store.dispatch(loadDotCalendar({ requestedDate: this._currentDate }));
        return;
      }
      this.columns = this.config?.slots?.length;
    });

    this.store.select(selectStateCurrentlySelectedActivity).pipe(
      takeUntil(this.destroy$),
    ).subscribe((activity) => {
      this._currentlySelectedActivity = activity;
    });
  }

  onDateChanged(date: string) {
    this._currentDate = date;
    this.store.dispatch(loadDotCalendar({ requestedDate: date }));
  }

  handleClickedDot(firstIndex: number, secondIndex: number) {
    if (!this.config) {
      return;
    }

    if (
      !this._currentlySelectedActivity
      || this.config.board[firstIndex][secondIndex].activityId === this._currentlySelectedActivity?.id
    ) {
      this._unselectClickedDot(firstIndex, secondIndex);
      return;
    }

    this._colorAsCurrentlySelected(firstIndex, secondIndex);
  }

  private _colorAsCurrentlySelected(firstIndex: number, secondIndex: number) {
    if (!this.config || !this._currentlySelectedActivity) {
      return;
    }

    const newConfig = JSON.parse(JSON.stringify(this.config));
    newConfig.board[firstIndex][secondIndex] = {
      activityId: this._currentlySelectedActivity.id,
      name: this._currentlySelectedActivity.name,
      color: this._currentlySelectedActivity.color,
    };
    this.store.dispatch(saveDotCalendar({ dotCalendar: newConfig }));
  }

  private _unselectClickedDot(firstIndex: number, secondIndex: number) {
    if (!this.config) {
      return;
    }
    const newConfig = JSON.parse(JSON.stringify(this.config));
    delete newConfig.board[firstIndex][secondIndex].activityId;
    delete newConfig.board[firstIndex][secondIndex].color;
    this.store.dispatch(saveDotCalendar({ dotCalendar: newConfig }));
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
