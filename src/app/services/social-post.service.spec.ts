import { TestBed } from '@angular/core/testing';

import { SocialPostService } from './social-post.service';

describe('SocialPostService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SocialPostService = TestBed.get(SocialPostService);
    expect(service).toBeTruthy();
  });
});
