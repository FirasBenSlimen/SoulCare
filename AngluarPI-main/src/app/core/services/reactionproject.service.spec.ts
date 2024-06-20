import { TestBed } from '@angular/core/testing';

import { ReactionprojectService } from './reactionproject.service';

describe('ReactionprojectService', () => {
  let service: ReactionprojectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReactionprojectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
