import { Item } from './item.model';
import { ID, guid } from '@datorama/akita';

export interface Note {
  id: ID;
  title: string;
  content?: string;
  items?: Item[];
  color?: string;
}

export function createNote({
  id = guid(),
  title = '',
  content = null,
  items = null,
  color = null
}: Partial<Note>): Note {
  return {
    id,
    title,
    content,
    items,
    color
  };
}
