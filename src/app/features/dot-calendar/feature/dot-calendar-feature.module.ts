import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { DotCalendarComponent } from './component/dot-calendar/dot-calendar.component';
import { DatepickerComponent } from './component/datepicker/datepicker.component';
import { DotCalendarDataAccessModule } from '../data-access/dot-calendar-data-access.module';

@NgModule({
  declarations: [
    DotCalendarComponent,
    DatepickerComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    DotCalendarDataAccessModule,
  ],
  exports: [
    DotCalendarComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DotCalendarFeatureModule { }
