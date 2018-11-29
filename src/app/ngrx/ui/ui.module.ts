import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiComponent } from './ui.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NoteboardModule } from './noteboard/noteboard.module';
import { RouterModule } from '@angular/router';
import { UiRouteModule } from './ui-routing.module';

@NgModule({
  imports: [CommonModule, NoteboardModule, UiRouteModule, SharedModule],
  declarations: [UiComponent]
})
export class UiModule {}
