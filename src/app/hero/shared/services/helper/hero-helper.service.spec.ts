import { TestBed } from '@angular/core/testing';

import { HeroHelperService } from './hero-helper.service';

describe('HeroHelperService', () => {
  let service: HeroHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeroHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
