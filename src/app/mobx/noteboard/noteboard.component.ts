import {
  Component,
  AfterViewInit,
  OnDestroy,
  QueryList,
  ViewChildren,
  ChangeDetectionStrategy,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';
import { NoteComponent } from 'src/app/shared/component/note/note.component';
import { Observable, of } from 'rxjs';
import { Breakpoints } from '@angular/cdk/layout';
import { BreakpointService } from 'src/app/shared/service/breakpoint.service';
import { NoteboardUtilService } from 'src/app/shared/service/noteboardUtil.service';
import { Note } from 'src/app/shared/model/Note.model';
import { MatBottomSheetConfig } from '@angular/material';
import { NoteboardService } from './noteboard.service';
import { NoteboardStore } from './noteboard.store';
import { delay } from 'rxjs/operators';
import { untilDestroyed } from 'ngx-take-until-destroy';

interface TileRowSpan {
  [id: string]: number;
}

@Component({
  selector: 'app-noteboard',
  templateUrl: './noteboard.component.html',
  styleUrls: ['./noteboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteboardComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChildren(NoteComponent)
  private notesRef: QueryList<NoteComponent>;
  readonly isHandset$: Observable<
    boolean
  > = this.breakpointService.getMatchBreakpoint(Breakpoints.Handset);

  readonly gridSpec = this.noteboardUtil.gridSpec;
  readonly tileRowSpan: TileRowSpan = {};

  constructor(
    private changeDetector: ChangeDetectorRef,
    private breakpointService: BreakpointService,
    private noteboardStore: NoteboardStore,
    private noteboardService: NoteboardService,
    readonly noteboardUtil: NoteboardUtilService
  ) {}

  get notes(): Note[] {
    return this.noteboardStore.filterNotes;
  }

  openEditor(options: MatBottomSheetConfig = {}) {
    this.noteboardService.openNoteEditor(options);
  }

  edit(selectedNote: Note) {
    this.noteboardStore.setActiveNote(selectedNote.id);

    this.openEditor({
      data: {
        payload: {
          ...selectedNote
        },
        afterDismissed: () => this.noteboardStore.clearActiveNote(),
        submit: this.submit.bind(this)
      }
    });
  }

  submit(editNote: Note) {
    this.noteboardStore.updateNote(editNote);
  }

  delete(id: string) {
    this.noteboardStore.deleteNote(id);
  }

  setTileRowSpan(noteRef: NoteComponent) {
    if (!noteRef) {
      return;
    }

    this.tileRowSpan[noteRef.id] = this.noteboardUtil.setRowSpan(noteRef);
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.notesRef.changes
      .pipe(
        delay(0),
        untilDestroyed(this)
      )
      .subscribe(changes => {
        // TODO: Consider not to clear the selectedNote in order to obtain
        //      it from the store instrad of the below forEach.
        changes.forEach(noteRef => this.setTileRowSpan(noteRef));

        this.changeDetector.detectChanges();
      });
  }

  count() {
    console.count('noteboard: ');
  }

  ngOnDestroy() {}
}
