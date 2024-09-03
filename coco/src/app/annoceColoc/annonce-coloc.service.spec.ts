import { TestBed } from '@angular/core/testing';

import { AnnonceColocService } from './annonce-coloc.service';

describe('AnnonceColocService', () => {
  let service: AnnonceColocService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnnonceColocService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
