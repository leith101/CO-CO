import { TestBed } from '@angular/core/testing';

import { BackcertiService } from './backcerti.service';

describe('BackcertiService', () => {
  let service: BackcertiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackcertiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
