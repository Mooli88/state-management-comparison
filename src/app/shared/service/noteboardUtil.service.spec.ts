/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NoteboardUtilService } from './noteboardUtil.service';

describe('Service: NoteboardUtil', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NoteboardUtilService]
    });
  });

  it('should ...', inject([NoteboardUtilService], (service: NoteboardUtilService) => {
    expect(service).toBeTruthy();
  }));
});
