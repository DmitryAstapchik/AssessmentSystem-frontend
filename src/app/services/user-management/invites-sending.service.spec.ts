import { TestBed, inject } from '@angular/core/testing';

import { InvitesSenderService } from './invites-sending.service';

describe('InvitesSenderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InvitesSenderService]
    });
  });

  it('should be created', inject([InvitesSenderService], (service: InvitesSenderService) => {
    expect(service).toBeTruthy();
  }));
});
