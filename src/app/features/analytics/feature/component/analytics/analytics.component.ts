import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AnalyticsInterface } from 'src/app/core/interfaces/analytics.interface';
import { AnalyticsService } from '../../service/analytics.service';

@Component({
  selector: 'did-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss'],
})
export class AnalyticsComponent {
  data$!: Observable<AnalyticsInterface[]>;

  constructor(private readonly analyticsService: AnalyticsService) {}

  ngOnInit() {
    this.data$ = this.analyticsService.prepareAnalyticData();
  }
}
