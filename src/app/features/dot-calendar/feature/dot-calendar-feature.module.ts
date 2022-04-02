import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { DotCalendarComponent } from './component/dot-calendar/dot-calendar.component';
import { DatepickerComponent } from './component/datepicker/datepicker.component';

@NgModule({
  declarations: [
    DotCalendarComponent,
    DatepickerComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    DotCalendarComponent,
  ],
})
export class DotCalendarFeatureModule { }
