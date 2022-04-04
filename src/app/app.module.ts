import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './layout/login/login.component';
import { HomeComponent } from './layout/home/home.component';
import { ProfileComponent } from './layout/profile/profile.component';
import { DotCalendarFeatureModule } from './features/dot-calendar/feature/dot-calendar-feature.module';
import { ActivityManagementFeatureModule } from './features/activity-management/feature/activity-management-feature.module';
import { SharedModule } from './shared/shared.module';
import { StoreService } from './shared/services/store.service.abstract';
import { LocalStorageStoreService } from './shared/services/local-storage-store.service';
import { AnalyticsFeatureModule } from './features/analytics/feature/analytics-feature.module';
import { ActivityTrackingModule } from './features/activity-tracking/feature/activity-tracking/activity-tracking.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DotCalendarFeatureModule,
    ActivityManagementFeatureModule,
    ActivityTrackingModule,
    AnalyticsFeatureModule,
    SharedModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
  ],
  providers: [
    { provide: StoreService, useClass: LocalStorageStoreService },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
