import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  @Output()
  private search: EventEmitter<string> = new EventEmitter();
  @Input()
  readonly placeholder: string;

  constructor() {}

  searchTerm(val) {
    this.search.emit(val.trim());
  }
}
