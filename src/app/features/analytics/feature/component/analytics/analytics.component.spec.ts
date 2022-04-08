import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockProvider } from 'ng-mocks';
import { AnalyticsService } from '../../service/analytics.service';

import { AnalyticsComponent } from './analytics.component';

enum MockEnum {
  TEST = 'test',
  TEST2 = 'test2',
}
describe('AnalyticsComponent', () => {
  let component: AnalyticsComponent;
  let fixture: ComponentFixture<AnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnalyticsComponent],
      providers: [
        MockProvider(AnalyticsService),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select nextElement in Enum correctly', () => {
    component.chartTypes = MockEnum as any;
    component.chartType = (MockEnum as any).TEST;
    component.changeAnalytics();
    expect(component.chartType).toEqual(MockEnum.TEST2);

    component.changeAnalytics();
    expect(component.chartType).toEqual(MockEnum.TEST);
  });
});
