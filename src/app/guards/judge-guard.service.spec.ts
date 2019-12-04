import { TestBed } from '@angular/core/testing';

import { JudgeGuard } from './judge-guard.service';

describe('JudgeGuard', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JudgeGuard = TestBed.get(JudgeGuard);
    expect(service).toBeTruthy();
  });
});
