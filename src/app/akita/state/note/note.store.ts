import { EntityState, StoreConfig, EntityStore, ID } from '@datorama/akita';
import { Note } from './note.model';

export interface NoteState extends EntityState<Note> {
  // activeNote: ID;
  searchTerm: string;
}

@StoreConfig({ name: 'Note' })
export class NoteStore extends EntityStore<NoteState, Note> {
  constructor() {
    super();
  }
}
