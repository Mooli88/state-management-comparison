import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteService } from './state/note/note.service';
import { NoteQuery } from './state/note/note.query';
import { UiModule } from './ui/ui.module';
import { environment } from 'src/environments/environment';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';

@NgModule({
  imports: [CommonModule, UiModule, AkitaNgDevtools.forRoot({ maxAge: 8 })],
  declarations: []
})
export class AkitaModule {}
