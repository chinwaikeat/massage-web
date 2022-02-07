import { TestBed } from '@angular/core/testing';

import { DataCommunicationService } from './data-communication.service';

describe('DataCommunicationService', () => {
  let service: DataCommunicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataCommunicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
