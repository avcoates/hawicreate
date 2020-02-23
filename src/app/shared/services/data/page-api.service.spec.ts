import { TestBed } from '@angular/core/testing';

import { PageApiService } from './page-api.service';

describe('PageApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PageApiService = TestBed.get(PageApiService);
    expect(service).toBeTruthy();
  });
});
