import { TestBed } from '@angular/core/testing';

import { MongoBackendService } from './mongo-backend.service';

describe('MongoBackendService', () => {
  let service: MongoBackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MongoBackendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
