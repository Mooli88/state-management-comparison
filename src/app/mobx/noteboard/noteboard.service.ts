import { Injectable } from '@angular/core';
import { MatBottomSheetConfig, MatBottomSheet } from '@angular/material';
import { createNote, Note } from 'src/app/shared/model/Note.model';
import { BottomSheetContainerComponent } from 'src/app/shared/component/bottom-sheet-container/bottom-sheet-container.component';
import { NoteboardStore } from './noteboard.store';

@Injectable()
export class NoteboardService {
  constructor(
    private noteboardStore: NoteboardStore,
    private bottomSheet: MatBottomSheet
  ) {}

  setNewNoteConfig(): MatBottomSheetConfig {
    // NOTE: Assign null to id so Editor would be able to deffrinciate between new note to an exsiting
    const data = {
      payload: {
        ...createNote({ id: null })
      },
      submit: (note: Note) => {
        // NOTE: Assign undefined to id in order for createNote to reassign new guid id on submit
        this.noteboardStore.addNote(createNote({ ...note, id: undefined }));
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
