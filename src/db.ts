import { Note } from './app/shared/model/Note.model';

export const Notes: Note[] = [
  {
    id: '0',
    title: 'My password',
    content: 'B9**ch*35',
    color: 'lightgrey'
  },
  {
    id: '1',
    title: 'Shopping list',
    items: [
      {
        id: '1',
        value: 'milk',
        complete: false
      },
      {
        id: '2',
        value: 'bananas',
        complete: false
      },
      {
        id: '3',
        value: 'tea',
        complete: true
      }
    ],
    color: 'lightblue'
  },
  {
    id: '2',
    title: 'Meow'
  },
  {
    id: '3',
    title: 'Don\'t forget!',
    content: 'To not forget',
    color: 'lightpink'
  },
  {
    id: '4',
    title: 'Long text',
    content: `Cupcake ipsum dolor sit amet cheesecake biscuit macaroon. Candy canes bonbon pastry. Gingerbread tiramisu bonbon croissant caramels dessert.
    Chupa chups wafer jujubes sweet cake oat cake cheesecake biscuit gummi bears. Dessert soufflé fruitcake tootsie roll cotton candy pudding pie gummi bears. Candy toffee carrot cake danish.
    Cupcake ipsum dolor sit amet cheesecake biscuit macaroon. Candy canes bonbon pastry. Gingerbread tiramisu bonbon croissant caramels dessert.
    Chupa chups wafer jujubes sweet cake oat cake cheesecake biscuit gummi bears. Dessert soufflé fruitcake tootsie roll cotton candy pudding pie gummi bears. Candy toffee carrot cake danish.`,
    color: 'lightgreen'
  }
];
