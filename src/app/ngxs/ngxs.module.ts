import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { UiModule } from './ui/ui.module';
import { NoteState } from './state/note/note.state';
import { CommonModule } from '@angular/common';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
@NgModule({
  imports: [
    CommonModule,
    UiModule,
    // NgxsModule.forFeature([NoteState]),
    NgxsModule.forRoot([NoteState], { developmentMode: true }),
    NgxsReduxDevtoolsPluginModule.forRoot({ maxAge: 8 })
  ],
  declarations: []
})
export class NgxsAbModule {}
