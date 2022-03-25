import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './layout/login/login.component';
import { HomeComponent } from './layout/home/home.component';
import { ProfileComponent } from './layout/profile/profile.component';
import { DotCalendarModule } from './modules/dot-calendar/dot-calendar.module';
import { ActivityManagementModule } from './modules/activity-management/activity-management.module';
import { SharedModule } from './shared/shared.module';
import { StoreService } from './shared/services/store.service.abstract';
import { LocalStorageStoreService } from './shared/services/local-storage-store.service';
import { AnalyticsModule } from './modules/analytics/analytics.module';

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
    DotCalendarModule,
    ActivityManagementModule,
    AnalyticsModule,
    SharedModule,
    BrowserAnimationsModule,
  ],
  providers: [
    { provide: StoreService, useClass: LocalStorageStoreService },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
