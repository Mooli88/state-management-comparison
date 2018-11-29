import { Component, OnInit } from '@angular/core';
import { NoteboardStore } from './noteboard/noteboard.store';

@Component({
  selector: 'app-mobx',
  templateUrl: './mobx.component.html',
  styleUrls: ['./mobx.component.scss']
})
export class MobxComponent implements OnInit {
  constructor(private noteboardStore: NoteboardStore) {}

  get isNoteLoading(): boolean {
    return this.noteboardStore.isLoading;
  }

  search(value) {
    this.noteboardStore.updateFilter(value);
  }

  ngOnInit() {
    this.noteboardStore.getNotes();
  }
}
