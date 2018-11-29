import { Injectable } from '@angular/core';
import { AkitaModule } from '../../akita.module';
import { NoteStore } from './note.store';
import { DataService } from 'src/app/shared/service/data.service';
import { switchMap, tap, reduce, map } from 'rxjs/operators';
import { createNote, Note } from './note.model';
import { ID } from '@datorama/akita';

@Injectable()
export class NoteService {
  constructor(private noteStore: NoteStore, private dataService: DataService) {}

  getNotes() {
    this.dataService
      .getNotes()
      // NOTE: If results --> result are identical in shape to Note, this pipe can be skippied
      .pipe(map(results => results.map(result => createNote(result))))
      .subscribe(results => {
        this.noteStore.set(results);
      });
  }

  // NOTE: Even nicer with async await :)
  async addNote(note: Note) {
    this.setLoading(true);

    await this.dataService.addNote(note).toPromise();

    this.noteStore.add(note);
    this.setLoading();
  }

  deleteNote(id: ID) {
    this.setLoading(true);
    this.noteStore.remove(id);
    this.dataService
      .deleteNote(id.toString())
      .subscribe(() => this.setLoading());
  }

  clearActiveNote() {
    this.noteStore.setActive(null);
  }

  setActiveNote(id: ID) {
    this.noteStore.setActive(id);
  }

  updateActiveNote(options: Partial<Note>) {
    this.setLoading(true);

    this.dataService.updateNote(options).subscribe(result => {
      this.noteStore.update(result.id, result);
      this.setLoading();
    });
  }

  updateSearchTerm(searchTerm: string) {
    this.noteStore.updateRoot({
      searchTerm
    });
  }

  setLoading(value: boolean = false) {
    this.noteStore.setLoading(value);
  }
}
