import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { isAnyStateLoading, State } from '../reducers';
import { SetSearchsTerm } from '../state/search/search.actions';

@Component({
  selector: 'app-ui',
  templateUrl: './ui.component.html'
})
export class UiComponent implements OnInit {
  constructor(private store: Store<State>) {}

  get isAnyLoading$(): Observable<boolean> {
    return this.store.pipe(select(isAnyStateLoading));
  }

  search(value) {
    this.store.dispatch(new SetSearchsTerm(value));
  }

  ngOnInit() {}
}
