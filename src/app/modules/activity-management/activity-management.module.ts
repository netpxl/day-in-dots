import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityManagmentComponent } from './component/activity-managment/activity-managment.component';
import { NewActivityComponent } from './component/new-activity/new-activity.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SingleActivityComponent } from './component/single-activity/single-activity.component';



@NgModule({
  declarations: [
    ActivityManagmentComponent,
    NewActivityComponent,
    SingleActivityComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [ActivityManagmentComponent]
})
export class ActivityManagementModule { }
