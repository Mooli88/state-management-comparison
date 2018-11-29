import { Note } from 'src/app/akita/state/note/note.model';

export interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName: string;
  notes?: Note[];
}
