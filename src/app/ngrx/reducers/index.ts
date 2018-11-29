import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromNotes from '../state/note/note.reducer';
import * as fromSelectedNote from '../state/selected-note/selected-note.reducer';
import * as fromSearch from '../state/search/search.reducer';

export interface State {
  notes: fromNotes.State;
  selectedNote: fromSelectedNote.State;
  search: fromSearch.State;
}

export const reducers: ActionReducerMap<State> = {
  notes: fromNotes.reducer,
  selectedNote: fromSelectedNote.reducer,
  search: fromSearch.reducer
};

// Search
export const selectSearchState = createFeatureSelector<fromNotes.State>(
  'search'
);
export const selectSearchTerm = createSelector(
  selectSearchState,
  fromSearch.selectValue
);

// notes
export const selectNotesState = createFeatureSelector<fromNotes.State>('notes');

export const selectNoteEntities = createSelector(
  selectNotesState,
  fromNotes.selectEntities
);

export const selectNotes = createSelector(
  selectNotesState,
  fromNotes.selectAll
);

export const selectFilteredNotes = createSelector(
  selectSearchTerm,
  selectNotes,
  (searchTerm, notes) =>
    notes.filter(note =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
);

export const selectNotesLoading = createSelector(
  selectNotesState,
  state => state.isLoading
);

// selectedNote
export const selectSselectedNoteState = createFeatureSelector<
  fromSelectedNote.State
>('selectedNote');

export const isAnyStateLoading = createSelector(
  selectNotesLoading,
  // Add other states
  (...values) => values.some(val => val)
);

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
