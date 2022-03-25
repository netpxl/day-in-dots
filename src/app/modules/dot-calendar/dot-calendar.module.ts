import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DotCalendarComponent } from './component/dot-calendar/dot-calendar.component';
import { DotComponent } from './component/dot/dot.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    DotCalendarComponent,
    DotComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    DotCalendarComponent
  ]
})
export class DotCalendarModule { }
