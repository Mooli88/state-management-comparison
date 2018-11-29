import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteboardComponent } from './noteboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NoteboardService } from './noteboard.service';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [NoteboardComponent],
  providers: [NoteboardService]
})
export class NoteboardModule {}
