import { ID, guid } from '@datorama/akita';
import { Item } from 'src/app/shared/model/item.model';

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
