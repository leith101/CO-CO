import { TestBed } from '@angular/core/testing';

import { ContractService } from './contract-service.service';

describe('ContractServiceService', () => {
  let service: ContractService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContractService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
