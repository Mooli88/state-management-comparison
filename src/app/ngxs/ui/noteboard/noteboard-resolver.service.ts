import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { filter, tap, takeWhile } from 'rxjs/operators';
import { Store, Select } from '@ngxs/store';
import { LoadNotes } from '../../state/note/note.actions';
import { isNotesLoading$ } from '../../state/note';
import { of, Observable } from 'rxjs';

@Injectable()
export class NoteboardResolverService implements Resolve<any> {
  constructor(private store: Store) {}

  getNotes() {
    this.store.dispatch(new LoadNotes());
  }

  isNotesReady(): Promise<boolean> {
    return new Promise(resolve =>
      this.store
        .select(isNotesLoading$)
        .pipe(
          filter(val => !val),
          tap(_ => resolve()),
          takeWhile(val => !val)
        )
        .subscribe()
    );
  }

  async resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    this.getNotes();
    return await this.isNotesReady();
  }
}
