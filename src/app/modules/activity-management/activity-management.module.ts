import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityManagmentComponent } from './component/activity-managment/activity-managment.component';
import { NewActivityComponent } from './component/new-activity/new-activity.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SingleActivityComponent } from './component/single-activity/single-activity.component';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    ActivityManagmentComponent,
    NewActivityComponent,
    SingleActivityComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
  ],
  exports: [ActivityManagmentComponent]
})
export class ActivityManagementModule { }
