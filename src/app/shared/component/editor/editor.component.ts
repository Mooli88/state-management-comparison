import {
  Component,
  OnInit,
  ElementRef,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Item } from '../../model/item.model';

interface Editor {
  id: string;
  title: string;
  content?: string;
  items?: Item[];
  color?: string;
}

function cloneListObj(items: Item[]) {
  return items.map(val => {
    return { ...val };
  });
}

function EditorFactory({
  id,
  title,
  content = null,
  items = [],
  color = ''
}): Editor {
  return {
    id,
    title,
    content,
    color,
    items: cloneListObj(items || [])
  };
}

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  @Input()
  private values: Editor;
  @Output()
  private close = new EventEmitter();
  @Output('submit')
  private _submit = new EventEmitter<any>();
  private id;
  private _editorForm: FormGroup;

  // readonly noteItemsTemplate: TemplateRef<any>;

  constructor(private fb: FormBuilder, private ref: ElementRef) {}

  get isNewContent() {
    return !this.id;
  }

  get content(): string {
    return this.values.content;
  }

  get title(): string {
    return this.values.title;
  }

  get items(): Item[] {
    return this.values.items;
  }

  get color(): string {
    return this.values.color;
  }

  get editorForm(): FormGroup {
    return this._editorForm;
  }

  addItem(item: Item) {
    this.values.items.push(item);
  }

  removeItem(id: string) {
    this.values.items = this.values.items.filter(item => item.id !== id);
  }

  closeEditor() {
    this.close.emit();
  }

  setNewSelection(selectedItem: Item) {
    const index = this.items.findIndex(item => item.id === selectedItem.id);
    this.items[index].complete = selectedItem.complete;
  }

  selectColor(color: string) {
    // NOTE: Editor reflect the selected color:
    // this.ref.nativeElement.parentElement.style.background = color;
    this._editorForm.get('color').setValue(color);
  }

  submit() {
    this._editorForm.get('items').setValue(this.items);

    this._submit.emit({
      ...this.values,
      ...this._editorForm.value
    });

    this.closeEditor();
  }

  ngOnInit() {
    this.values = EditorFactory(this.values);
    this.id = this.values.id;
    this._editorForm = this.fb.group({
      id: [this.values.id],
      title: [this.values.title, Validators.required],
      content: [this.values.content],
      items: [this.values.items],
      color: [this.values.color]
    });
  }
}
