import { Injectable } from '@angular/core';
import { MatBottomSheet, MatBottomSheetConfig } from '@angular/material';
import { EditorComponent } from 'src/app/shared/component/editor/editor.component';
import { Note, createNote } from '../../state/note/note.model';
import { NoteService } from '../../state/note/note.service';
import { NoteboardUtilService } from 'src/app/shared/service/noteboardUtil.service';
import { BottomSheetContainerComponent } from 'src/app/shared/component/bottom-sheet-container/bottom-sheet-container.component';

@Injectable()
export class NoteboardService extends NoteboardUtilService {
  constructor(
    private noteService: NoteService,
    private bottomSheet: MatBottomSheet
  ) {
    super();
  }

  setNewNoteConfig(): MatBottomSheetConfig {
    // NOTE: Assign null to id so Editor would be able to deffrinciate between new note to an exsiting
    const data = {
      payload: {
        ...createNote({ id: null })
      },
      submit: (note: Note) => {
        // NOTE: Assign undefined to id in order for createNote to reassign new guid id on submit
        this.noteService.addNote(createNote({ ...note, id: undefined }));
      }
    };

    return { data };
  }

  openNoteEditor(options = {}) {
    options = {
      ...this.setNewNoteConfig(),
      ...options
    };

    this.bottomSheet.open(BottomSheetContainerComponent, options);
  }
}
