import { Injectable } from '@angular/core';
import { SharedModule } from '../shared.module';
import { Observable, of } from 'rxjs';
import { Notes } from 'src/db';
import { delay } from 'rxjs/operators';
import { Note } from '../model/Note.model';

@Injectable({
  providedIn: SharedModule
})
export class DataService {
  getNotes(): Observable<Note[]> {
    return of(Notes).pipe(delay(2500));
  }

  addNote(note: Note): Observable<{ data: Note; status: string }> {
    return of({ data: note, status: 'AddNote success' }).pipe(delay(1800));
  }

  deleteNote(id: string): Observable<string> {
    return of('Delete success').pipe(delay(1000));
  }

  updateNote(options: Partial<Note>) {
    return of(options).pipe(delay(2000));
  }

  constructor() {}
}
