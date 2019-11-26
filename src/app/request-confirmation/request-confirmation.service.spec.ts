import { TestBed } from '@angular/core/testing';

import { RequestConfirmationService } from './request-confirmation.service';

describe('RequestConfirmationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RequestConfirmationService = TestBed.get(RequestConfirmationService);
    expect(service).toBeTruthy();
  });
});
