import { Injectable } from '@angular/core';
import { action, observable, computed, autorun } from 'mobx';
// import { observable, computed, action } from 'mobx-angular';

import { Note } from 'src/app/shared/model/Note.model';
import { DataService } from 'src/app/shared/service/data.service';
import { NoteboardUtilService } from 'src/app/shared/service/noteboardUtil.service';

@Injectable()
export class NoteboardStore {
  // @observable private notes: Note[] = [];
  @observable notes: Note[] = [];
  @observable activeNote: Note = null;
  @observable filter = '';
  @observable private loading = false;

  constructor(
    private dataService: DataService,
    private noteboardUtil: NoteboardUtilService
  ) {}

  @computed
  get isLoading() {
    return this.loading;
  }

  @action
  async getNotes() {
    this.loading = true;
    this.notes = await this.dataService.getNotes().toPromise();
    this.loading = false;
  }

  @action
  addNote(note: Note) {
    this.notes = [...this.notes, note];
  }

  @action
  deleteNote(id: string) {
    this.notes = this.notes.filter(note => note.id !== id);
  }

  @action
  setActiveNote(id: string | number) {
    this.activeNote = this.notes.find(note => note.id === id);
  }

  @action
  clearActiveNote() {
    this.activeNote = null;
  }

  @action
  updateActiveNote(note: Note) {
    for (const i in this.activeNote) {
      this.activeNote[i] = note[i];
    }
  }

  @action
  updateNote(note: Partial<Note>) {
    const noteIndex = this.notes.findIndex(currNote => currNote.id === note.id);
    const currNote = this.notes[noteIndex];

    this.notes[noteIndex] = { ...currNote, ...note };
  }

  @action
  updateFilter(value: string = '') {
    this.filter = value;
  }

  @computed
  get filterNotes() {
    return this.noteboardUtil.filterNotes(this.notes, this.filter);
  }
}
