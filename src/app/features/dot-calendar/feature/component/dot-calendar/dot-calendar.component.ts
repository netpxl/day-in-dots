import {
  Component, HostBinding, OnInit,
} from '@angular/core';
import { DayBoardInterface } from 'src/app/core/interface/day-board.interface';
import { StoreService } from 'src/app/shared/services/store.service.abstract';
import { DotCalendarService } from '../../service/dot-calendar.service';

@Component({
  selector: 'did-dot-calendar',
  templateUrl: './dot-calendar.component.html',
  styleUrls: ['./dot-calendar.component.scss'],
})
export class DotCalendarComponent implements OnInit {
  @HostBinding('style.--__columns') columns = 4;

  config?: DayBoardInterface;

  private _currentDate = '';

  constructor(
    private readonly dotCalendarService: DotCalendarService,
    private readonly storeService: StoreService,
  ) {}

  ngOnInit(): void {
    this.storeService.config$.subscribe((response) => {
      this.config = response || undefined;
      if (!this.config) {
        this.config = this.dotCalendarService.generateNewDayBoard(this._currentDate);
      }
      this.columns = this.config?.slots.length;
    });
  }

  onDateChanged(date: string) {
    this._currentDate = date;
    this.storeService.loadDotCalendar(date);
  }

  handleClickedDot(firstIndex: string | number, secondIndex: string | number) {
    if (typeof firstIndex === 'string') {
      firstIndex = parseInt(firstIndex, 10);
    }

    if (typeof secondIndex === 'string') {
      secondIndex = parseInt(secondIndex, 10);
    }
    if (!this.config) {
      return;
    }

    if (
      !this.storeService.currentlySelectedActivitiy
      || this.config.board[firstIndex][secondIndex].activityId === this.storeService.currentlySelectedActivitiy.id
    ) {
      this._unselectClickedDot(firstIndex, secondIndex);
      return;
    }

    this._colorAsCurrentlySelected(firstIndex, secondIndex);
  }

  private _colorAsCurrentlySelected(firstIndex: number, secondIndex: number) {
    if (!this.config || !this.storeService.currentlySelectedActivitiy) {
      return;
    }

    this.config.board[firstIndex][secondIndex] = {
      id: this.config.board[firstIndex][secondIndex].id,
      activityId: this.storeService.currentlySelectedActivitiy.id,
      name: this.storeService.currentlySelectedActivitiy.name,
      color: this.storeService.currentlySelectedActivitiy.color,
    };
    this.storeService.persistDataIntoLocalStorage(this.config);
  }

  private _unselectClickedDot(firstIndex: number, secondIndex: number) {
    if (!this.config) {
      return;
    }
    delete this.config.board[firstIndex][secondIndex].activityId;
    delete this.config.board[firstIndex][secondIndex].color;
    this.storeService.persistDataIntoLocalStorage(this.config);
  }
}
