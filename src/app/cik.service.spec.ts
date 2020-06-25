import { TestBed } from '@angular/core/testing';

import { CikService } from './cik.service';

describe('CikService', () => {
  let service: CikService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CikService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
