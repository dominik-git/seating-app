import { TestBed } from '@angular/core/testing';

import { EnablePageGuard } from './enable-page.guard';

describe('EnablePageGuard', () => {
  let guard: EnablePageGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EnablePageGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
