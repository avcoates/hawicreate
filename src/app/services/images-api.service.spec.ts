import { TestBed } from '@angular/core/testing';

import { ImagesApiService } from './images-api.service';

describe('ImagesApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImagesApiService = TestBed.get(ImagesApiService);
    expect(service).toBeTruthy();
  });
});
