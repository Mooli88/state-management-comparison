import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Store, select } from '@ngrx/store';
import { LoadNotes } from '../../state/note/note.actions';
import { State } from '../../state/note/note.reducer';
import { filter, tap, takeWhile } from 'rxjs/operators';
import { selectNotesLoading } from '../../reducers';

@Injectable()
export class NoteboardResolverService implements Resolve<any> {
  constructor(private store: Store<State>) {}

  getNotes() {
    this.store.dispatch(new LoadNotes());
  }

  isNotesReady(): Promise<boolean> {
    return new Promise(resolve =>
      this.store
        .pipe(
          select(selectNotesLoading),
          filter(val => !val),
          tap(val => resolve(val)),
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
