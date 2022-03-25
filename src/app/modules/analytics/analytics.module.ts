import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarChartComponent } from './component/bar-chart/bar-chart.component';
import { AnalyticsComponent } from './component/analytics/analytics.component';

@NgModule({
  declarations: [
    BarChartComponent,
    AnalyticsComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    AnalyticsComponent,
  ],
})
export class AnalyticsModule { }
