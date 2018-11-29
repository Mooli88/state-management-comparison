import { storiesOf, moduleMetadata } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { withNotes } from '@storybook/addon-notes';
import { array, object, color } from '@storybook/addon-knobs/angular';
import { NoteComponent } from 'src/app/akita/ui/noteboard/note/note.component';
import { NoteboardService } from 'src/app/akita/ui/noteboard/noteboard.service';
import { NoteService } from 'src/app/akita/state/note/note.service';
import { NoteStore } from 'src/app/akita/state/note/note.store';
import { DataService } from 'src/app/shared/service/data.service';
import { ListItemsComponent } from 'src/app/shared/component/list-items/list-items.component';
import { ReactiveFormsModule } from '@angular/forms';

const noteTemplate = `
      <app-note class="an" [note]="note"
                (delete)="delete($event)">
      </app-note>
    `;

const styles = [
  `app-note {
        width: 50%;
        display: block;
        margin: 0 auto;
      }`
];

storiesOf('Note', module)
  .addDecorator(withNotes)
  .addDecorator(
    moduleMetadata({
      imports: [ReactiveFormsModule],
      declarations: [NoteComponent, ListItemsComponent],
      providers: [NoteboardService, NoteService, NoteStore, DataService]
    })
  )
  .add('Title only', () => ({
    // component: NoteComponent,
    template: noteTemplate,
    props: {
      note: {
        id: '123',
        title: 'Simple Note'
      },
      delete: action('Delete')
    },
    styles
  }))

  .add('With different text size', () => ({
    template: `
    <app-note class="an" [note]="noteShortText"
              (delete)="delete($event)">
    </app-note>
    <br>
    <app-note [note]="noteMedtText"
              (delete)="delete($event)">
    </app-note>
    <br>
    <app-note [note]="noteLongText"
              (delete)="delete($event)">
    </app-note>
  `,
    props: {
      noteShortText: {
        id: '123',
        title: 'Simple Note',
        content: 'Short Text'
      },
      noteMedtText: {
        id: '124',
        title: 'Simple Note',
        content: 'Medium Text :)'
      },
      noteLongText: {
        id: '125',
        title: 'Simple Note',
        content: 'Long Looooooooooooooooooooooooooon Text :)'
      },
      delete: action('Delete')
    },
    styles
  }))

  .add(
    'With a list',
    () => {
      const editableItem = object('items', [
        {
          id: '4',
          value: 'Try me in KNOBS 👍',
          complete: false
        }
      ]);

      return {
        template: noteTemplate,
        // component: NoteComponent,
        props: {
          note: {
            id: '123',
            title: 'Simple Note',
            items: [
              {
                id: '1',
                value: 'Buy milk',
                complete: false
              },
              {
                id: '2',
                value: 'Send that letter',
                complete: true
              },
              {
                id: '3',
                value: 'Feed the cat 🐱',
                complete: false
              },
              ...editableItem
            ]
          },
          delete: action('Delete')
        },
        styles
      };
    },
    {
      notes: `
      <ul>
        <li>We can't edit notes direcly. For that we need the Editor component</li>
        <li>The complete state won\'t toggle correctly in this environment</li>
    `
    }
  )

  .add('In different colour', () => {
    const noteColor = color('color');

    return {
      // component: NoteComponent,
      template: noteTemplate,
      props: {
        note: {
          id: '124',
          title: 'I can change color',
          content: `color ${noteColor}`,
          color: noteColor
        },
        delete: action('Delete')
      },
      styles
    };
  });
