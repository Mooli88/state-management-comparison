import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import * as noteActions from './note.actions';
import { switchMap, map } from 'rxjs/operators';
import { DataService } from 'src/app/shared/service/data.service';
import { Note } from 'src/app/shared/model/Note.model';
import { Update } from '@ngrx/entity';

const noteActionTypes = noteActions.NoteActionTypes;

@Injectable()
export class NoteEffects {
  @Effect()
  loadNotes$: Observable<Action> = this.actions$.pipe(
    ofType(noteActionTypes.LoadNotes),
    switchMap(_ => this.dataService.getNotes()),
    map((notes: Note[]) => new noteActions.LoadNotesSuccess({ notes }))
  );

  @Effect()
  addNote$: Observable<Action> = this.actions$.pipe(
    ofType(noteActionTypes.AddNote),
    switchMap((action: noteActions.AddNote) =>
      this.dataService.addNote(action.payload)
    ),
    map(result => new noteActions.AddNoteSuccess(result.data))
  );

  @Effect()
  updateNote$: Observable<Action> = this.actions$.pipe(
    ofType(noteActionTypes.UpdateNote),
    switchMap((action: noteActions.UpdateNote) =>
      this.dataService.updateNote(action.payload)
    ),
    map((result: Update<Note>) => new noteActions.UpdateNoteSuccess(result))
  );

  constructor(private actions$: Actions, private dataService: DataService) {}
}
