import { storiesOf, moduleMetadata } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { SearchComponent } from 'src/app/shared/component/search/search.component';

storiesOf('Search', module).add('Type and search', () => ({
  moduleMetadata: {
    declarations: [SearchComponent]
  },
  template: `
    <div style="background-color: #98969ab8; padding: 3em">
      <app-search (search)="onSearch($event)" [placeholder]="'Search'" ></app-search>
    </div>
  `,
  props: {
    onSearch: action('Search')
  }
}));
