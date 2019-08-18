import { TestBed } from '@angular/core/testing';

import { ReviewbookService } from './reviewbook.service';

describe('ReviewbookService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReviewbookService = TestBed.get(ReviewbookService);
    expect(service).toBeTruthy();
  });
});
