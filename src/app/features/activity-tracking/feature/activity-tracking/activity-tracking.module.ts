import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivityTrackingModalComponent } from './component/activity-tracking-modal/activity-tracking-modal.component';
import { ActivityTrackingComponent } from './component/activity-tracking/activity-tracking.component';

@NgModule({
  declarations: [
    ActivityTrackingComponent,
    ActivityTrackingModalComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [ActivityTrackingComponent],
})
export class ActivityTrackingModule { }
