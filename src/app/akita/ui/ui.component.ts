import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NoteQuery } from '../state/note/note.query';
import { NoteService } from '../state/note/note.service';

@Component({
  selector: 'app-ui',
  templateUrl: './ui.component.html'
})
export class UiComponent implements OnInit {
  constructor(private noteQuery: NoteQuery, private noteService: NoteService) {}

  get isAnyLoading$(): Observable<boolean> {
    // NOTE: for now, its only notes which we load.
    return this.noteQuery.selectLoading();
  }

  search(value) {
    this.noteService.updateSearchTerm(value);
  }

  ngOnInit() {}
}
