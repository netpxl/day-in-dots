import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromActivityManagmentState from './store/activity-management.reducer';
import { ActivityManagementEffects } from './store/activity-management.effects';
import { LocalStorageStoreService } from './service/local-storage-store.service';
import { StoreService } from './service/store.service.abstract';

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
  providers: [
    { provide: StoreService, useClass: LocalStorageStoreService },
  ],
})
export class ActivityManagementDataAccessModule { }
