import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
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
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  exports: [ActivityManagmentComponent],
})
export class ActivityManagementFeatureModule { }
