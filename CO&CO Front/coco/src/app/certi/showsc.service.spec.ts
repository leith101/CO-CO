import { TestBed } from '@angular/core/testing';

import { ShowscService } from './showsc.service';

describe('ShowscService', () => {
  let service: ShowscService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowscService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
