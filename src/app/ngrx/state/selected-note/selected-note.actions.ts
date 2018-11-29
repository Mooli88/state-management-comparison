import { Action } from '@ngrx/store';
import { SelectedNote } from './selected-note.model';

export enum SelectedNoteActionTypes {
  GetSelectedNote = '[SelectedNote] Get SelectedNote',
  ClearSelectedNote = '[SelectedNote] Clear SelectedNote'
  // UpdateSelectedNote = '[SelectedNote] Update SelectedNote'
}

export class GetSelectedNote implements Action {
  readonly type = SelectedNoteActionTypes.GetSelectedNote;

  constructor(public payload: { selectedNote: SelectedNote }) {}
}

export class ClearSelectedNote implements Action {
  readonly type = SelectedNoteActionTypes.ClearSelectedNote;
}

export type SelectedNoteActions = GetSelectedNote | ClearSelectedNote;
