import {
  Component, EventEmitter, OnInit, Output,
} from '@angular/core';

@Component({
  selector: 'did-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
})
export class DatepickerComponent implements OnInit {
  selectedDate = new Date();

  @Output()
    dateChanged = new EventEmitter<string>();

  ngOnInit(): void {
    this.emitNewDate();
  }

  formatDateForMachine(date: Date): string {
    return `${date.getFullYear()}${date.getMonth()}${date.getDate()}`;
  }

  private emitNewDate() {
    this.selectedDate = new Date(this.selectedDate.getTime());
    this.dateChanged.emit(this.formatDateForMachine(this.selectedDate));
  }

  selectNextDate() {
    this.selectedDate.setDate(this.selectedDate.getDate() + 1);
    this.emitNewDate();
  }

  selectPreviousDate() {
    this.selectedDate.setDate(this.selectedDate.getDate() - 1);
    this.emitNewDate();
  }
}
