import { createSelector } from '@ngxs/store';
import { NoteState, NoteStateModel } from './note.state';
import { Note } from 'src/app/shared/model/Note.model';

export const isNotesLoading$ = createSelector(
  [NoteState.noteState$],
  (state: NoteStateModel) => state.isLoading as boolean
);

export const noteFilter$ = createSelector(
  [NoteState.noteState$],
  (state: NoteStateModel) => state.filter
);

export const notes$ = createSelector(
  [NoteState.noteState$],
  (state: NoteStateModel) => state.notes
);

export const filteredNotes$ = createSelector(
  [notes$, noteFilter$],
  (notes: Note[], filter) =>
    notes.filter(note =>
      note.title.toLowerCase().includes(filter.searchTerm.toLowerCase())
    )
);

export const noteEntities$ = createSelector(
  [NoteState.noteState$],
  (state: NoteStateModel) => {
    const noteEntities: { [key: string]: Note } = {};
    state.notes.forEach(note => (noteEntities[note.id] = note));
    return noteEntities;
  }
);
