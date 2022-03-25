import { TestBed } from '@angular/core/testing';

import { LocalStorageStoreService } from './local-storage-store.service';

describe('LocalStorageStoreService', () => {
  let service: LocalStorageStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
