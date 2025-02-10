import { TestBed } from '@angular/core/testing';

import { RegisrtationService } from './regisrtation.service';

describe('RegisrtationService', () => {
  let service: RegisrtationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisrtationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
