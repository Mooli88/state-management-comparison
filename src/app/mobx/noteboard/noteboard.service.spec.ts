/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NoteboardService } from './noteboard.service';

describe('Service: Noteboard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NoteboardService]
    });
  });

  it('should ...', inject([NoteboardService], (service: NoteboardService) => {
    expect(service).toBeTruthy();
  }));
});
