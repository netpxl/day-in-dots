import { Component, HostBinding, OnInit } from '@angular/core';
import { DayBoardInterface } from 'src/app/core/interfaces/day-board.interface';
import { LocalStorageStoreService } from 'src/app/shared/services/local-storage-store.service';
import { StoreService } from 'src/app/shared/services/store.service.abstract';
import { DotCalendarService } from '../../service/dot-calendar.service';

@Component({
  selector: 'app-dot-calendar',
  templateUrl: './dot-calendar.component.html',
  styleUrls: ['./dot-calendar.component.scss']
})
export class DotCalendarComponent implements OnInit {
  @HostBinding("style.--__columns") columns: number = 5;

  config?: DayBoardInterface;

  constructor(
    private readonly dotCalendarService: DotCalendarService,
    private readonly storeService: LocalStorageStoreService
  ) {}

  ngOnInit(): void {
    const date = new Date();
    const dateString = '' + date.getFullYear() + date.getMonth() + date.getDate()
    this.storeService.config$.subscribe((response) => {
      this.config = response || undefined;
      if (!this.config) {
        this.config = this.dotCalendarService.generateNewDayBoard(dateString);
      }
      this.columns = this.config?.slots.length
    })
    this.storeService.loadDotCalendar(dateString);
  }

  colorAsCurrentlySelected(firstIndex: number, secondIndex: number) {
    if (!this.config || !this.storeService.currentlySelectedActivitiy) {
      return;
    }
    this.config.board[firstIndex][secondIndex] = {
      id: this.config.board[firstIndex][secondIndex].id,
      activityId: this.storeService.currentlySelectedActivitiy.id,
      color: this.storeService.currentlySelectedActivitiy.color,
      hour: this.config.hours[firstIndex],
      slot: this.config.slots[secondIndex]
    }
    this.storeService.persistDataIntoLocalStorage(this.config)
  }
}
