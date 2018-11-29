import {
  Component,
  ViewChildren,
  QueryList,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Breakpoints } from '@angular/cdk/layout';
import { BreakpointService } from 'src/app/shared/service/breakpoint.service';
import { MatBottomSheetConfig } from '@angular/material';
import { Store, select } from '@ngrx/store';
import {
  State as NoteBoardState,
  selectNoteEntities,
  selectFilteredNotes
} from '../../reducers';
import { DeleteNote, UpdateNote } from '../../state/note/note.actions';
import { NoteboardService } from './noteboard.service';
import {
  GetSelectedNote,
  ClearSelectedNote
} from '../../state/selected-note/selected-note.actions';
import { delay } from 'rxjs/operators';
import { Note } from 'src/app/shared/model/Note.model';
import { NoteComponent } from 'src/app/shared/component/note/note.component';

interface TileRowSpan {
  [id: string]: number;
}

@Component({
  selector: 'app-noteboard',
  templateUrl: './noteboard.component.html',
  styleUrls: ['./noteboard.component.scss']
})
export class NoteboardComponent implements AfterViewInit, OnDestroy {
  @ViewChildren(NoteComponent)
  private notesRef: QueryList<NoteComponent>;
  private noteRefChanges$: Subscription;
  readonly isHandset$: Observable<
    boolean
  > = this.breakpointService.getMatchBreakpoint(Breakpoints.Handset);

  readonly gridSpec = this.noteboardService.gridSpec;
  readonly tileRowSpan: TileRowSpan = {};

  constructor(
    private breakpointService: BreakpointService,
    private store: Store<NoteBoardState>,
    readonly noteboardService: NoteboardService
  ) {}

  get notes$(): Observable<Note[]> {
    return this.store.pipe(select(selectFilteredNotes));
  }

  openEditor(options: MatBottomSheetConfig = {}) {
    this.noteboardService.openNoteEditor(options);
  }

  edit(selectedNote: Note) {
    this.store.dispatch(new GetSelectedNote({ selectedNote }));

    this.openEditor({
      data: {
        payload: {
          ...selectedNote
        },
        afterDismissed: () => this.store.dispatch(new ClearSelectedNote()),
        submit: this.submit.bind(this)
      }
    });
  }

  submit(editNote: Note) {
    this.store.dispatch(
      new UpdateNote({
        id: editNote.id.toString(),
        changes: editNote
      })
    );
  }

  delete(id: string) {
    this.store.dispatch(new DeleteNote({ id }));
  }

  setTileRowSpan(noteRef: NoteComponent) {
    if (!noteRef) {
      return;
    }

    this.tileRowSpan[noteRef.id] = this.noteboardService.setRowSpan(noteRef);
  }

  ngAfterViewInit() {
    const noteEntities = this.store
      .pipe(
        delay(0),
        select(selectNoteEntities)
      )
      .subscribe(notes => {
        this.notesRef.forEach(noteRef => this.setTileRowSpan(noteRef));
        noteEntities.unsubscribe();
      });

    this.noteRefChanges$ = this.notesRef.changes
      .pipe(delay(0))
      .subscribe(changes => {
        // TODO: Consider not to clear the selectedNote in order to obtain
        //      it from the store instrad of the below forEach.

        changes.forEach(noteRef => this.setTileRowSpan(noteRef));
        // this.setRowSpan(change.last);
      });
  }

  ngOnDestroy() {
    this.noteRefChanges$.unsubscribe();
  }
}
