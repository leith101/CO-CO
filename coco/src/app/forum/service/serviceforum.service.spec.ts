import { TestBed } from '@angular/core/testing';

import { ServiceforumService } from './serviceforum.service';

describe('ServiceforumService', () => {
  let service: ServiceforumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceforumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
