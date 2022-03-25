import {
  Component, EventEmitter, OnInit, Output,
} from '@angular/core';

@Component({
  selector: 'did-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
})
export class DatepickerComponent implements OnInit {
  _selectedDate = new Date();

  @Output()
    dateChanged = new EventEmitter<string>();

  ngOnInit(): void {
    this.emitNewDate();
  }

  formatDateForMachine(date: Date): string {
    return `${date.getFullYear()}${date.getMonth()}${date.getDate()}`;
  }

  private emitNewDate() {
    this.dateChanged.emit(this.formatDateForMachine(this._selectedDate));
  }

  selectNextDate() {
    this._selectedDate = new Date(this._selectedDate.setDate(this._selectedDate.getDate() + 1));
    this.emitNewDate();
  }

  selectPreviousDate() {
    this._selectedDate = new Date(this._selectedDate.setDate(this._selectedDate.getDate() - 1));
    this.emitNewDate();
  }
}
