// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';
import { ngMocks } from 'ng-mocks';
import { EMPTY } from 'rxjs';
import { StoreService } from './app/shared/services/store.service.abstract';
import { ActivityInterface } from './app/core/interface/activity.interface';

declare const require: {
  context(path: string, deep?: boolean, filter?: RegExp): {
    <T>(id: string): T;
    keys(): string[];
  };
};

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
);

// Then we find all the tests.
const context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);
ngMocks.autoSpy('jasmine');

ngMocks.defaultMock(StoreService, () => ({
  currentlySelectedActivitiy: ({} as ActivityInterface),
  getActivities: () => EMPTY,
  persistDataIntoLocalStorage: () => EMPTY,
  loadDotCalendar: () => EMPTY,
  setCurrentlySelectedActivity: () => EMPTY,
  saveActivity: () => EMPTY,
  updateActivity: () => EMPTY,
  deleteActivity: () => EMPTY,
}));
