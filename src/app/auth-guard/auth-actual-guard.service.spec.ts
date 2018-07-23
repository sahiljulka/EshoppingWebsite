import { TestBed, inject } from '@angular/core/testing';

import { AuthActualGuardService } from './auth-actual-guard.service';

describe('AuthActualGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthActualGuardService]
    });
  });

  it('should be created', inject([AuthActualGuardService], (service: AuthActualGuardService) => {
    expect(service).toBeTruthy();
  }));
});
