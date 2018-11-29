import { State, Action, StateContext, Selector, Store } from '@ngxs/store';
import { DataService } from 'src/app/shared/service/data.service';
import * as NoteActions from './note.actions';
import { Note } from 'src/app/shared/model/Note.model';
import { tap } from 'rxjs/operators';

export interface NoteStateModel {
  notes: Note[];
  isLoading: boolean;
  selectedNote: Note;
  filter: {
    searchTerm: string;
  };
}

@State<NoteStateModel>({
  name: 'notes',
  defaults: {
    notes: [],
    isLoading: true,
    selectedNote: null,
    filter: {
      searchTerm: ''
    }
  }
})
export class NoteState {
  constructor(private dataService: DataService, store: Store) {}

  // Memoized State selector
  @Selector()
  static noteState$(state: NoteStateModel): NoteStateModel {
    return state;
  }

  findNoteIndex(notes: Note[], id: string | number) {
    return notes.concat().findIndex(note => note.id === id);
  }

  @Action(NoteActions.LoadNotes)
  async loadNotes$(ctx: StateContext<NoteStateModel>) {
    const state = ctx.getState();

    ctx.patchState({
      isLoading: true
    });

    const notes = await this.dataService.getNotes().toPromise();

    // NOTE: We can either dispatch a new action or mutate the state right here.
    ctx.patchState({
      notes,
      isLoading: false
    });

    // NOTE: dispacthing a new action in here will cause LoadNote to wait until this action
    //      is complete, which result in wrong order of action in the Ngxs dev-tool

    // return ctx.dispatch(new NoteActions.LoadNotesSuccess(notes));
  }

  @Action(NoteActions.LoadNotesSuccess)
  loadNotesSuccess$(
    ctx: StateContext<NoteStateModel>,
    action: NoteActions.LoadNotesSuccess
  ) {
    const { notes } = action;

    ctx.patchState({
      notes,
      isLoading: false
    });
  }

  @Action(NoteActions.AddNote)
  addNote$(ctx: StateContext<NoteStateModel>, action: NoteActions.AddNote) {
    const state = ctx.getState();
    const { note } = action;

    note.id = Math.ceil(Math.random() * 9999).toString();
    // TODO: check here that this id isn't exist:

    ctx.patchState({
      isLoading: true
    });

    return this.dataService.addNote(note).pipe(
      tap(() =>
        ctx.patchState({
          notes: [...state.notes, note],
          isLoading: false
        })
      )
    );
  }

  @Action(NoteActions.DeleteNote)
  deleteNote$(
    ctx: StateContext<NoteStateModel>,
    action: NoteActions.DeleteNote
  ) {
    const state = ctx.getState();
    const { id } = action;
    const notes = state.notes.concat();
    const noteIndex = this.findNoteIndex(state.notes, id);
    notes.splice(noteIndex, 1);

    ctx.patchState({
      isLoading: true
    });

    this.dataService.deleteNote(id);

    ctx.patchState({
      // notes: state.notes.filter(note => note.id !== note.id)
      notes,
      isLoading: false
    });
  }

  @Action(NoteActions.UpdateNote)
  async updateNote$(
    ctx: StateContext<NoteStateModel>,
    action: NoteActions.UpdateNote
  ) {
    const state = ctx.getState();
    const { id, changes } = action.payload;
    const notes = state.notes.concat();
    const noteIndex = this.findNoteIndex(notes, id);
    const note = notes[noteIndex];

    notes[noteIndex] = { ...note, ...changes };
    ctx.patchState({
      isLoading: true
    });

    await this.dataService.updateNote(note).toPromise();

    ctx.patchState({
      notes,
      isLoading: false
    });
  }

  @Action(NoteActions.ClearSelectedNote)
  ClearSelectedNote$(ctx: StateContext<NoteStateModel>) {
    ctx.patchState({
      selectedNote: null
    });
  }

  @Action(NoteActions.SetSelectedNote)
  setSelectedNote$(
    ctx: StateContext<NoteStateModel>,
    action: NoteActions.SetSelectedNote
  ) {
    ctx.patchState({
      selectedNote: action.note
    });
  }

  @Action(NoteActions.SetNoteSearchTerm)
  setNoteSearchTerm$(
    ctx: StateContext<NoteStateModel>,
    action: NoteActions.SetNoteSearchTerm
  ) {
    const state = ctx.getState();

    ctx.patchState({
      filter: {
        ...state.filter,
        searchTerm: action.value
      }
    });
  }
}
