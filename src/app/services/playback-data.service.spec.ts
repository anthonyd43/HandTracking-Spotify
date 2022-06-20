import { TestBed } from '@angular/core/testing';

import { PlaybackDataService } from './playback-data.service';

describe('PlaybackDataService', () => {
  let service: PlaybackDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlaybackDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
