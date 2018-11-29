import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-color-palette',
  templateUrl: './color-palette.component.html',
  styleUrls: ['./color-palette.component.scss']
})
export class ColorPaletteComponent implements OnInit {
  @Input()
  readonly colorPalette: string[] = [
    'lightblue',
    'lightpink',
    'lightgreen',
    'lightskyblue',
    'lightcoral',
    'lightgrey'
  ];
  @Output()
  selectColor: EventEmitter<string> = new EventEmitter<string>();
  @Input()
  private selectedColor: string;

  setColor(color: string) {
    this.selectedColor = color;
    this.selectColor.emit(color);
  }

  constructor() {}

  ngOnInit() {}
}
