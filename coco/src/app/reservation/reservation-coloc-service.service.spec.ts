import { TestBed } from '@angular/core/testing';

import { ReservationColocServiceService } from './reservation-coloc-service.service';

describe('ReservationColocServiceService', () => {
  let service: ReservationColocServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservationColocServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
