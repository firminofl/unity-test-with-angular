import { TestBed } from '@angular/core/testing';

import { HeroStorageService } from './hero-storage.service';

describe('HeroStorageService', () => {
  let service: HeroStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeroStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
