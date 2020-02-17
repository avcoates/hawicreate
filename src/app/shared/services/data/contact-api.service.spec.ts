import { TestBed } from '@angular/core/testing';

import { ContactApiService } from './contact-api.service';

describe('ContactApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContactApiService = TestBed.get(ContactApiService);
    expect(service).toBeTruthy();
  });
});
