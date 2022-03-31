import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ChartTypeEnum } from 'src/app/core/enum/ChartType.enum';
import { AnalyticsInterface } from 'src/app/core/interface/analytics.interface';
import { AnalyticsService } from '../../service/analytics.service';

@Component({
  selector: 'did-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss'],
})
export class AnalyticsComponent {
  data$!: Observable<AnalyticsInterface[]>;

  chartType: ChartTypeEnum = ChartTypeEnum.BAR;

  chartTypes = ChartTypeEnum;

  constructor(private readonly analyticsService: AnalyticsService) {}

  ngOnInit() {
    this.data$ = this.analyticsService.prepareAnalyticData();
  }

  changeAnalytics() {
    const chartTypesObject = Object.entries(this.chartTypes);
    const currentIndex = chartTypesObject.findIndex((type) => type && type[1] === this.chartType);
    const newIndex = currentIndex + 1 >= chartTypesObject.length ? 0 : currentIndex + 1;
    this.chartType = chartTypesObject[newIndex][1];
  }
}
