import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActivityManagmentComponent } from './component/activity-managment/activity-managment.component';
import { NewActivityComponent } from './component/new-activity/new-activity.component';
import { SingleActivityComponent } from './component/single-activity/single-activity.component';

@NgModule({
  declarations: [
    ActivityManagmentComponent,
    NewActivityComponent,
    SingleActivityComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  exports: [ActivityManagmentComponent],
})
export class ActivityManagementFeatureModule { }
