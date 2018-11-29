import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { filter, tap, takeWhile } from 'rxjs/operators';
import { NoteService } from '../../state/note/note.service';
import { NoteQuery } from '../../state/note/note.query';
import { Observable } from 'rxjs';
import { Note } from 'src/app/shared/model/Note.model';

@Injectable()
export class NoteboardResolverService implements Resolve<any> {
  constructor(private noteService: NoteService, private noteQuery: NoteQuery) {}

  getNotes() {
    this.noteService.getNotes();
  }

  isNotesReady(): Promise<boolean> {
    return new Promise(resolve =>
      this.noteQuery
        .selectLoading()
        .pipe(
          filter(val => !val),
          tap(val => resolve(val)),
          takeWhile(val => !val)
        )
        .subscribe()
    );
  }

  // TODO: figure out why this isnt working...
  // resolve(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot
  // ): Observable<Note[]> {
  //   this.getNotes();
  //   return this.noteQuery.selectAll().pipe(filter(val => !!val.length));
  // }

  async resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    this.getNotes();
    return await this.isNotesReady();
  }
}
