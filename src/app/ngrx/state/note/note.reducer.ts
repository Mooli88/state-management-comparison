import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { NoteActions, NoteActionTypes } from './note.actions';
import { Note } from 'src/app/shared/model/Note.model';

export interface State extends EntityState<Note> {
  // additional entities state properties
  isLoading: boolean;
}

export const adapter: EntityAdapter<Note> = createEntityAdapter<Note>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  isLoading: true
});

export function reducer(state = initialState, action: NoteActions): State {
  switch (action.type) {
    case NoteActionTypes.UpdateNote:
    case NoteActionTypes.LoadNotes:
    case NoteActionTypes.AddNote: {
      return {
        ...state,
        isLoading: true
      };
    }

    case NoteActionTypes.AddNoteSuccess: {
      const id = Math.ceil(Math.random() * 9999).toString();
      // TODO: check here that this id isn't exist:
      const note = action.payload;
      note.id = id;
      return adapter.addOne(note, { ...state, isLoading: false });
    }

    case NoteActionTypes.UpdateNoteSuccess: {
      return adapter.updateOne(action.payload, { ...state, isLoading: false });
    }

    case NoteActionTypes.DeleteNote: {
      return adapter.removeOne(action.payload.id.toString(), {
        ...state,
        isLoading: false
      });
    }

    case NoteActionTypes.LoadNotesSuccess: {
      return adapter.addAll(action.payload.notes, {
        ...state,
        isLoading: false
      });
    }

    case NoteActionTypes.ClearNotes: {
      return adapter.removeAll(state);
    }

    default: {
      return state;
    }
  }
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();
