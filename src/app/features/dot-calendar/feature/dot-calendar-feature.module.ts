import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { DotCalendarComponent } from './component/dot-calendar/dot-calendar.component';
import { DotComponent } from './component/dot/dot.component';
import { DatepickerComponent } from './component/datepicker/datepicker.component';

@NgModule({
  declarations: [
    DotCalendarComponent,
    DotComponent,
    DatepickerComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
  ],
  exports: [
    DotCalendarComponent,
  ],
})
export class DotCalendarFeatureModule { }
