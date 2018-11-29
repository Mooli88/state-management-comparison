import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  ChangeDetectionStrategy
} from '@angular/core';
import { Note, createNote } from '../../model/Note.model';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteComponent implements OnInit {
  @Input()
  private note: Note;
  @Input()
  private noteService;
  @Output()
  delete = new EventEmitter<string>();

  @ViewChild('contentEl')
  readonly contentEl: ElementRef;

  @ViewChild('itemsEl')
  readonly itemsEl: ElementRef;
  private _lastModified = Date.now();
  private _contentDisplaySize: string;

  public get id() {
    return this.note.id;
  }

  public get title() {
    return this.note.title;
  }

  public get content() {
    return this.note.content;
  }

  public get items() {
    return this.note.items;
  }

  public get color() {
    return this.note.color;
  }

  public get lastModified() {
    return this._lastModified;
  }

  public get contentDisplaySize() {
    return this._contentDisplaySize;
  }

  count() {
    console.count('note: ' + this.id);
  }

  ngOnInit() {
    this.note = createNote(this.note);
    this._contentDisplaySize = this.noteService.getContentDisplaySize(
      this.content
    );
  }
}
