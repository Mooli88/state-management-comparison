import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { isNotesLoading$ } from '../state/note';
import { Observable } from 'rxjs';
import { SetNoteSearchTerm } from '../state/note/note.actions';

@Component({
  selector: 'app-ui',
  templateUrl: './ui.component.html'
})
export class UiComponent {
  @Select(isNotesLoading$)
  readonly isLoading$: Observable<boolean>;

  constructor(private store: Store) {}

  search(value) {
    this.store.dispatch(new SetNoteSearchTerm(value));
  }
}
