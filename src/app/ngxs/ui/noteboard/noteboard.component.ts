import {
  Component,
  ViewChildren,
  QueryList,
  AfterViewInit,
  OnDestroy,
  Input
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Breakpoints } from '@angular/cdk/layout';
import { BreakpointService } from 'src/app/shared/service/breakpoint.service';
import { MatBottomSheetConfig } from '@angular/material';
// import { NoteComponent } from './note/note.component';
import {
  DeleteNote,
  UpdateNote,
  SetSelectedNote,
  ClearSelectedNote
} from '../../state/note/note.actions';
import { NoteboardService } from './noteboard.service';
import { delay, filter, map, tap, take } from 'rxjs/operators';
import * as NoteStateIndex from '../../state/note';
import { Select, Store } from '@ngxs/store';
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
  @Input()
  private searchTerm = '';
  @ViewChildren(NoteComponent)
  private notesRef: QueryList<NoteComponent>;
  private noteRefChanges$: Subscription;
  readonly isHandset$: Observable<
    boolean
  > = this.breakpointService.getMatchBreakpoint(Breakpoints.Handset);

  readonly gridSpec = this.noteboardService.gridSpec;
  readonly tileRowSpan: TileRowSpan = {};

  @Select(NoteStateIndex.filteredNotes$)
  readonly notes$;

  constructor(
    private breakpointService: BreakpointService,
    readonly noteboardService: NoteboardService,
    private store: Store
  ) {}

  openEditor(options: MatBottomSheetConfig = {}) {
    this.noteboardService.openNoteEditor(options);
  }

  edit(selectedNote: Note) {
    this.store.dispatch(new SetSelectedNote(selectedNote));

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
        id: editNote.id,
        changes: editNote
      })
    );
  }

  addNote() {}

  // TODO: move to shared service
  delete(id: string) {
    this.store.dispatch(new DeleteNote(id));
  }

  setTileRowSpan(noteRef: NoteComponent) {
    if (!noteRef) {
      return;
    }

    this.tileRowSpan[noteRef.id] = this.noteboardService.setRowSpan(noteRef);
  }

  ngAfterViewInit() {
    const noteEntities = this.store
      .select(NoteStateIndex.noteEntities$)
      .pipe(
        delay(0)
        // TODO: Instead of creating a const for late unsubscribe, I can do that:
        // tap(notesRef.forEach...),
        // take(1)
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
      });
  }

  ngOnDestroy() {
    this.noteRefChanges$.unsubscribe();
  }
}
