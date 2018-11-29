import { Injectable } from '@angular/core';
import { AkitaModule } from '../../akita.module';
import { QueryEntity } from '@datorama/akita';
import { NoteState, NoteStore } from './note.store';
import { Note } from './note.model';
import { Observable, of, combineLatest } from 'rxjs';
import { NoteboardUtilService } from 'src/app/shared/service/noteboardUtil.service';

@Injectable()
export class NoteQuery extends QueryEntity<NoteState, Note> {
  selectNoteSearchTerm$ = this.select(state => state.searchTerm);

  selectFilteredNotes$ = combineLatest(
    this.selectAll(),
    this.selectNoteSearchTerm$,
    (notes: Note[], searchTerm: string = '') =>
      this.noteboardUtil.filterNotes(notes, searchTerm)
    // notes.filter(note =>
    //   note.title.toLowerCase().includes(searchTerm.toLowerCase())
    // )
  );

  constructor(
    protected store: NoteStore,
    private noteboardUtil: NoteboardUtilService
  ) {
    super(store);
  }
}
