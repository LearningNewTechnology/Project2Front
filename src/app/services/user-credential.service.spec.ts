import { TestBed } from '@angular/core/testing';

import { UserCredentialService } from './user-credential.service';

describe('UserCredentialService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserCredentialService = TestBed.get(UserCredentialService);
    expect(service).toBeTruthy();
  });
});
