import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { EditorComponent } from '../editor/editor.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bottom-sheet-container',
  templateUrl: './bottom-sheet-container.component.html',
  styleUrls: ['./bottom-sheet-container.component.scss']
})
export class BottomSheetContainerComponent implements OnInit {
  private onEditorDissmised$: Subscription = new Subscription();

  constructor(
    private bottomSheetRef: MatBottomSheetRef<EditorComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) readonly data
  ) {}

  close() {
    this.bottomSheetRef.dismiss();
  }

  submit(values) {
    this.data.submit(values);
  }

  ngOnInit() {
    if (typeof this.data.afterDismissed === 'function') {
      this.onEditorDissmised$ = this.bottomSheetRef
        .afterDismissed()
        .subscribe(_ => this.data.afterDismissed());
    }
  }

  ngOnDestroy() {
    // NOTE: setTimeout is needed since ngOnDestroy getting call before
    //      afterDismissed is emitting
    setTimeout(() => {
      this.onEditorDissmised$.unsubscribe();
    }, 0);
  }
}
