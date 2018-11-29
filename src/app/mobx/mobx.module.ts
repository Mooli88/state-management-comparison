import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MobxComponent } from './mobx.component';
import { SharedModule } from '../shared/shared.module';
import { NoteboardComponent } from './noteboard/noteboard.component';
import { MobxAngularModule } from 'mobx-angular';
import { MobxRouteModule } from './mobx-routing.module';
import { NoteboardStore } from './noteboard/noteboard.store';
import { NoteboardService } from './noteboard/noteboard.service';

@NgModule({
  imports: [CommonModule, MobxRouteModule, MobxAngularModule, SharedModule],
  providers: [NoteboardStore, NoteboardService],
  declarations: [MobxComponent, NoteboardComponent]
})
export class MobxModule {}
