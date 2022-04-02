import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MockProvider } from 'ng-mocks';
import { StoreService } from 'src/app/shared/services/store.service.abstract';

import { ActivityTrackingModalComponent } from './activity-tracking-modal.component';

describe('ActivityTrackingModalComponent', () => {
  let component: ActivityTrackingModalComponent;
  let fixture: ComponentFixture<ActivityTrackingModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
      ],
      declarations: [
        ActivityTrackingModalComponent,
      ],
      providers: [
        MockProvider(StoreService),
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityTrackingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
