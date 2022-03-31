import {
  Component, Input,
} from '@angular/core';
import { AnalyticsInterface } from 'src/app/core/interface/analytics.interface';

@Component({
  selector: 'did-numbers-analytics',
  templateUrl: './numbers-analytics.component.html',
  styleUrls: ['./numbers-analytics.component.scss'],
})
export class NumbersAnalyticsComponent {
  @Input()
    data: AnalyticsInterface[] = [];

  @Input()
    slotAmount = 4;
}
