import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromActivityManagmentState from './activity-management.reducer';
import { ActivityManagementEffects } from './activity-management.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromActivityManagmentState.activityManagementFeatureKey,
      fromActivityManagmentState.reducer,
    ),
    EffectsModule.forFeature([ActivityManagementEffects]),
  ],
})
export class ActivityManagementDataAccessModule { }
