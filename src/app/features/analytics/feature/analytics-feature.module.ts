import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarChartComponent } from './component/bar-chart/bar-chart.component';
import { AnalyticsComponent } from './component/analytics/analytics.component';
import { NumbersAnalyticsComponent } from './component/numbers-analytics/numbers-analytics.component';

@NgModule({
  declarations: [
    BarChartComponent,
    AnalyticsComponent,
    NumbersAnalyticsComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    AnalyticsComponent,
  ],
})
export class AnalyticsFeatureModule { }
