import {
  Component, HostBinding, OnInit,
} from '@angular/core';
import { DayBoardInterface } from 'src/app/core/interfaces/day-board.interface';
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

  currentDate = '';

  constructor(
    private readonly dotCalendarService: DotCalendarService,
    private readonly storeService: StoreService,
  ) {}

  ngOnInit(): void {
    this.storeService.config$.subscribe((response) => {
      this.config = response || undefined;
      if (!this.config) {
        this.config = this.dotCalendarService.generateNewDayBoard(this.currentDate);
      }
      this.columns = this.config?.slots.length;
    });
  }

  onDateChanged(date: string) {
    this.currentDate = date;
    this.storeService.loadDotCalendar(date);
  }

  colorAsCurrentlySelected(firstIndex: number, secondIndex: number) {
    if (!this.config) {
      return;
    }

    if (
      !this.storeService.currentlySelectedActivitiy
      || this.config.board[firstIndex][secondIndex].activityId === this.storeService.currentlySelectedActivitiy.id
    ) {
      delete this.config.board[firstIndex][secondIndex].activityId;
      delete this.config.board[firstIndex][secondIndex].color;
      this.storeService.persistDataIntoLocalStorage(this.config);
      return;
    }

    this.config.board[firstIndex][secondIndex] = {
      id: this.config.board[firstIndex][secondIndex].id,
      activityId: this.storeService.currentlySelectedActivitiy.id,
      color: this.storeService.currentlySelectedActivitiy.color,
      hour: this.config.hours[firstIndex],
      slot: this.config.slots[secondIndex],
    };
    this.storeService.persistDataIntoLocalStorage(this.config);
  }
}
