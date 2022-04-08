import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromDotCalendarState from './store/dot-calendar.reducer';
import { DotCalendarEffects } from './store/dot-calendar.effects';
import { StoreService } from './service/store.service.abstract';
import { LocalStorageStoreService } from './service/local-storage-store.service';
import { DotCalendarService } from './service/dot-calendar.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromDotCalendarState.dotCalendarFeatureKey,
      fromDotCalendarState.reducer,
    ),
    EffectsModule.forFeature([DotCalendarEffects]),
  ],
  providers: [
    { provide: StoreService, useClass: LocalStorageStoreService },
    DotCalendarService,
  ],
})
export class DotCalendarDataAccessModule { }
