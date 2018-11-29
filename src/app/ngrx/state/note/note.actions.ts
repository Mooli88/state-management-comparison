import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Note } from 'src/app/shared/model/Note.model';

export enum NoteActionTypes {
  LoadNotes = '[Note] Load Notes',
  LoadNotesSuccess = '[Note] Load Notes Success',
  AddNote = '[Note] Add Note',
  AddNoteSuccess = '[Note] Add Note Success',
  UpdateNote = '[Note] Update Note',
  UpdateNoteSuccess = '[Note] Update Note Success',
  DeleteNote = '[Note] Delete Note',
  ClearNotes = '[Note] Clear Notes'
}

export class LoadNotes implements Action {
  readonly type = NoteActionTypes.LoadNotes;
}

export class LoadNotesSuccess implements Action {
  readonly type = NoteActionTypes.LoadNotesSuccess;

  constructor(public payload: { notes: Note[] }) {}
}

export class AddNote implements Action {
  readonly type = NoteActionTypes.AddNote;

  constructor(public payload: Note) {}
}

export class AddNoteSuccess implements Action {
  readonly type = NoteActionTypes.AddNoteSuccess;

  constructor(public payload: Note) {}
}

export class UpdateNote implements Action {
  readonly type = NoteActionTypes.UpdateNote;

  constructor(public payload: Update<Note>) {}
}

export class UpdateNoteSuccess implements Action {
  readonly type = NoteActionTypes.UpdateNoteSuccess;

  constructor(public payload: Update<Note>) {}
}

export class DeleteNote implements Action {
  readonly type = NoteActionTypes.DeleteNote;

  constructor(public payload: { id: string | number }) {}
}

export class ClearNotes implements Action {
  readonly type = NoteActionTypes.ClearNotes;
}

export type NoteActions =
  | LoadNotes
  | LoadNotesSuccess
  | AddNote
  | AddNoteSuccess
  | UpdateNote
  | UpdateNoteSuccess
  | DeleteNote
  | ClearNotes;
