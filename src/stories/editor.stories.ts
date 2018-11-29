import { storiesOf, moduleMetadata } from '@storybook/angular';
import { withNotes } from '@storybook/addon-notes';
import { action } from '@storybook/addon-actions';
import { array, object, color } from '@storybook/addon-knobs/angular';
import { NoteboardService } from 'src/app/akita/ui/noteboard/noteboard.service';
import { EditorComponent } from 'src/app/shared/component/editor/editor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ListItemsComponent } from 'src/app/shared/component/list-items/list-items.component';
import { ColorPaletteComponent } from 'src/app/shared/component/color-palette/color-palette.component';

const template = `
  <mat-form-field style="display: none"><input matInput></mat-form-field>
  <div style="background-color: #424242; padding: 1rem 2em; width: 50%; margin: 2rem auto">

       <app-editor
          [values]="values"
          (submit)="submit($event)"
          (close)="close($event)">
       </app-editor>
  </div>
`;

storiesOf('Editor', module)
  .addDecorator(withNotes)
  .addDecorator(
    moduleMetadata({
      imports: [ReactiveFormsModule],
      declarations: [
        EditorComponent,
        ListItemsComponent,
        ColorPaletteComponent
      ],
      providers: [NoteboardService]
    })
  )
  .add('Create', () => ({
    template: template,
    props: {
      values: {},
      submit: action('Submit'),
      close: action('Close')
    }
  }))
  .add('With Text', () => {
    const values = {
      id: '123',
      title: 'With Text',
      content: 'Text! :D',
      color: 'lgihtpink'
    };

    return {
      template: template,
      props: {
        values,
        submit: action('Submit'),
        close: action('Close')
      }
    };
  })
  .add('With List', () => {
    const values = {
      id: '123',
      title: 'With Text',
      content: null,
      color: 'lightgreen',
      items: [
        {
          id: '1',
          value: 'Make tea',
          complete: true
        },
        {
          id: '2',
          value: 'Drink it',
          complete: false
        },
        {
          id: '3',
          value: 'Make another one',
          complete: false
        }
      ]
    };

    return {
      template: template,
      props: {
        values,
        submit: action('Submit'),
        close: action('Close')
      }
    };
  });
