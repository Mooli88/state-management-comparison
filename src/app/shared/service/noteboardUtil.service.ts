import { Injectable } from '@angular/core';
import { SharedModule } from '../shared.module';
import { NoteComponent } from '../component/note/note.component';
import { Note } from '../model/Note.model';

@Injectable({
  providedIn: SharedModule
})
export class NoteboardUtilService {
  readonly gridSpec = {
    rowHeight: 1,
    rowspan: 8,
    gutterSize: 10,
    minCol: 2,
    maxCol: 3
  };

  readonly displaySize = {
    med: {
      maxChar: 35,
      class: 'mat-display-1'
    },
    large: {
      maxChar: 12,
      class: 'mat-display-3'
    }
  };

  constructor() {}

  filterNotes(notes: Note[], searchTerm: string) {
    return notes.filter(note =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  getContentDisplaySize(content: string) {
    if (typeof content !== 'string') {
      return;
    }

    if (content.length <= this.displaySize.large.maxChar) {
      return this.displaySize.large.class;
    } else if (content.length <= this.displaySize.med.maxChar) {
      return this.displaySize.med.class;
    }
  }

  setItemsRows(nestedEl: HTMLElement) {
    const rowspan =
      (nestedEl.offsetHeight + 100) / (this.gridSpec.gutterSize + 1);
    return Math.ceil(rowspan);
  }

  setContentRows(element: HTMLElement) {
    const { rowHeight, rowspan, gutterSize } = this.gridSpec;
    const hight = element.offsetHeight;
    const lineHight = parseInt(
      window.getComputedStyle(element, null).getPropertyValue('line-height')
    );

    const calcRowspan = Math.floor(
      (hight + lineHight) / gutterSize + rowspan - (gutterSize - rowspan)
    );

    if (element.classList.contains(this.displaySize.large.class)) {
      return calcRowspan - rowHeight;
    }
    return calcRowspan;
  }

  setRowSpan(
    // noteRef: NgrxNoteComponent | NgxsNoteComponent | AkitaNoteComponent
    noteRef: NoteComponent
  ): number {
    let contentEle: HTMLElement;
    let rowSpan: number = this.gridSpec.rowspan;

    if (noteRef.content) {
      contentEle = noteRef.contentEl.nativeElement;
      rowSpan = this.setContentRows(contentEle);
    } else if (noteRef.items) {
      contentEle = noteRef.itemsEl.nativeElement;
      rowSpan = this.setItemsRows(contentEle);
    }

    return rowSpan;
  }
}
