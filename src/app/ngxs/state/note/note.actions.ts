import { NoteActionTypes } from 'src/app/ngrx/state/note/note.actions';
import { Note } from 'src/app/shared/model/Note.model';

export class LoadNotes {
  static readonly type = NoteActionTypes.LoadNotes;
}

export class LoadNotesSuccess {
  static readonly type = NoteActionTypes.LoadNotesSuccess;

  constructor(public notes: Note[]) {}
}

export class AddNote {
  static readonly type = NoteActionTypes.AddNote;

  constructor(public note: Note) {}
}

export class DeleteNote {
  static readonly type = NoteActionTypes.DeleteNote;

  constructor(public id: string) {}
}

export class UpdateNote {
  static readonly type = NoteActionTypes.UpdateNote;

  constructor(public payload: { id: string | number; changes: Partial<Note> }) {
    this.payload.id = this.payload.id.toString();
  }
}

export class ClearSelectedNote {
  static readonly type = '[Note] Clear Selected Note';
}

export class SetSelectedNote {
  static readonly type = '[Note] Set Selected Note';

  constructor(public note: Note) {}
}

export class SetNoteSearchTerm {
  static readonly type = '[Note Filter] Set Note Search Term';

  constructor(public value: string) {}
}
