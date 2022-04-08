import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { provideMockStore } from '@ngrx/store/testing';
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
        provideMockStore(),
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
