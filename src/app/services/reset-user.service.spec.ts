import { TestBed } from '@angular/core/testing';

import { ResetUserService } from './reset-user.service';

describe('ResetUserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResetUserService = TestBed.get(ResetUserService);
    expect(service).toBeTruthy();
  });
});
