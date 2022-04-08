import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ActivityManagementEffects } from './activity-management.effects';

describe('ActivityManagementEffects', () => {
  let actions$: Observable<any>;
  let effects: ActivityManagementEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ActivityManagementEffects,
        provideMockActions(() => actions$),
      ],
    });

    effects = TestBed.inject(ActivityManagementEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
