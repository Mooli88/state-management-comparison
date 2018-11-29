import { Injectable } from '@angular/core';
import { MatBottomSheet, MatBottomSheetConfig } from '@angular/material';
import { AddNote } from '../../state/note/note.actions';
import { NoteboardUtilService } from 'src/app/shared/service/noteboardUtil.service';
import { Store } from '@ngxs/store';
import { Note } from 'src/app/shared/model/Note.model';
import { BottomSheetContainerComponent } from 'src/app/shared/component/bottom-sheet-container/bottom-sheet-container.component';

@Injectable()
export class NoteboardService extends NoteboardUtilService {
  constructor(private store: Store, private bottomSheet: MatBottomSheet) {
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
