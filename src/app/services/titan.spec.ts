import { TestBed } from '@angular/core/testing';

import { TitanService } from './titan.service';

describe('TitanService', () => {
  let service: TitanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TitanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
