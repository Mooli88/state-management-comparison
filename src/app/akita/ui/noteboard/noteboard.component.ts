import {
  Component,
  ViewChildren,
  QueryList,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import { Observable } from 'rxjs';
import { Breakpoints } from '@angular/cdk/layout';
import { BreakpointService } from 'src/app/shared/service/breakpoint.service';
import { MatBottomSheetConfig } from '@angular/material';
// import { NoteComponent } from './note/note.component';
import { Note } from '../../state/note/note.model';
import { untilDestroyed } from 'ngx-take-until-destroy';

import { NoteboardService } from './noteboard.service';
import { delay } from 'rxjs/operators';
import { NoteQuery } from '../../state/note/note.query';
import { NoteService } from '../../state/note/note.service';
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
  readonly isHandset$: Observable<
    boolean
  > = this.breakpointService.getMatchBreakpoint(Breakpoints.Handset);

  readonly gridSpec = this.noteboardService.gridSpec;
  readonly tileRowSpan: TileRowSpan = {};

  constructor(
    private breakpointService: BreakpointService,
    private noteQuery: NoteQuery,
    private noteService: NoteService,
    readonly noteboardService: NoteboardService
  ) {}

  get notes$(): Observable<Note[]> {
    return this.noteQuery.selectFilteredNotes$;
  }

  openEditor(options: MatBottomSheetConfig = {}) {
    this.noteboardService.openNoteEditor(options);
  }

  edit(selectedNote: Note) {
    this.noteService.setActiveNote(selectedNote.id);

    this.openEditor({
      data: {
        payload: {
          ...selectedNote
        },
        afterDismissed: () => this.noteService.clearActiveNote(),
        submit: this.submit.bind(this)
      }
    });
  }

  submit(editNote: Note) {
    this.noteService.updateActiveNote(editNote);
  }

  delete(id: string) {
    this.noteService.deleteNote(id);
  }

  setTileRowSpan(noteRef: NoteComponent) {
    if (!noteRef) {
      return;
    }

    this.tileRowSpan[noteRef.id] = this.noteboardService.setRowSpan(noteRef);
  }

  ngAfterViewInit() {
    const noteEntities = this.noteQuery
      .selectAll({ asObject: true })
      .pipe(delay(0))
      .subscribe(_ => {
        this.notesRef.forEach(noteRef => this.setTileRowSpan(noteRef));
        noteEntities.unsubscribe();
      });

    this.notesRef.changes
      .pipe(
        delay(0),
        untilDestroyed(this)
      )
      .subscribe(changes => {
        // TODO: Consider not to clear the selectedNote in order to obtain
        //      it from the store instrad of the below forEach.

        changes.forEach(noteRef => this.setTileRowSpan(noteRef));
      });
  }

  ngOnDestroy() {}
}
