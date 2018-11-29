import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiComponent } from './ui.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NoteboardModule } from './noteboard/noteboard.module';
import { UiRouteModule } from './ui-routing.module';
import { NoteStore } from '../state/note/note.store';
import { NoteService } from '../state/note/note.service';
import { NoteQuery } from '../state/note/note.query';

@NgModule({
  imports: [CommonModule, UiRouteModule, NoteboardModule, SharedModule],
  declarations: [UiComponent],
  providers: [NoteService, NoteQuery, NoteStore]
})
export class UiModule {}
