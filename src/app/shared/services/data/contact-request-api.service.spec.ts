import { TestBed } from '@angular/core/testing';

import { ContactRequestApiService } from './contact-request-api.service';

describe('ContactApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContactRequestApiService = TestBed.get(ContactRequestApiService);
    expect(service).toBeTruthy();
  });
});
