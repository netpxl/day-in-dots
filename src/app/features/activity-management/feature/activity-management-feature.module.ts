import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActivityManagmentComponent } from './component/activity-managment/activity-managment.component';
import { NewActivityComponent } from './component/new-activity/new-activity.component';
import { SingleActivityComponent } from './component/single-activity/single-activity.component';
import { ActivityManagementDataAccessModule } from '../data-access/activity-management-data-access.module';

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
    ActivityManagementDataAccessModule,
  ],
  exports: [ActivityManagmentComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ActivityManagementFeatureModule { }
