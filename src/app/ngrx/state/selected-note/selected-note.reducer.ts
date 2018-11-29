import { SelectedNote } from './selected-note.model';
import {
  SelectedNoteActions,
  SelectedNoteActionTypes
} from './selected-note.actions';

export interface State extends SelectedNote {
  // additional entities state properties
}

export const initialState: State = null;

export function reducer(
  state = initialState,
  action: SelectedNoteActions
): State {
  switch (action.type) {
    case SelectedNoteActionTypes.GetSelectedNote: {
      return { ...action.payload.selectedNote };
    }

    case SelectedNoteActionTypes.ClearSelectedNote: {
      return null;
    }

    default: {
      return state;
    }
  }
}
