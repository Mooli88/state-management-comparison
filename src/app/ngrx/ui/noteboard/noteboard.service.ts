import { Injectable } from '@angular/core';
import { MatBottomSheet, MatBottomSheetConfig } from '@angular/material';
import { Store } from '@ngrx/store';
import { State as NoteState } from '../../state/note/note.reducer';
import { AddNote } from '../../state/note/note.actions';
import { NoteboardUtilService } from 'src/app/shared/service/noteboardUtil.service';
import { BottomSheetContainerComponent } from 'src/app/shared/component/bottom-sheet-container/bottom-sheet-container.component';
import { Note } from 'src/app/shared/model/Note.model';

@Injectable()
export class NoteboardService extends NoteboardUtilService {
  constructor(
    private store: Store<NoteState>,
    private bottomSheet: MatBottomSheet
  ) {
    super();
  }

  setNewNoteConfig(): MatBottomSheetConfig {
    return {
      data: {
        payload: {
          id: null,
          title: '',
          content: ''
        },
        submit: (note: Note) => {
          this.store.dispatch(new AddNote(note));
        }
      }
    };
  }

  openNoteEditor(options = {}) {
    options = {
      ...this.setNewNoteConfig(),
      ...options
    };

    this.bottomSheet.open(BottomSheetContainerComponent, options);
  }
}
