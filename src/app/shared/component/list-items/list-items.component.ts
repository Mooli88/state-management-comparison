import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import { guid } from '@datorama/akita';
import { Item } from '../../model/item.model';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.scss']
})
export class ListItemsComponent implements OnInit {
  @Input('items')
  readonly items: Item[];
  @Input()
  readonly editMode: boolean;
  @Output()
  selectionChange = new EventEmitter<Item>();
  @Output()
  addItem = new EventEmitter<Item>();
  @Output('removeItem')
  remove = new EventEmitter<string>();
  readonly listItemControl = new FormControl('', Validators.required);

  constructor(private fb: FormBuilder) {}

  add() {
    const value = this.listItemControl.value;
    const item = {
      id: guid(),
      value
    };

    this.addItem.emit(item);
    this.listItemControl.reset();
  }

  // remove(id: string) {
  //   this.removeItem.emit(id);
  // }

  toggleItemState(event) {
    const selectedItem = event.option.value;
    selectedItem.complete = event.option.selected;
    this.selectionChange.emit(selectedItem);
  }

  ngOnInit() {}
}
