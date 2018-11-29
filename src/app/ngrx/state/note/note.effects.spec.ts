import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { NoteEffects } from './note.effects';

describe('NoteEffects', () => {
  let actions$: Observable<any>;
  let effects: NoteEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NoteEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(NoteEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
