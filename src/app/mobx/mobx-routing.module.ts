import { Routes, RouterModule } from '@angular/router';

import { NgModule } from '@angular/core';
import { NoteboardComponent } from './noteboard/noteboard.component';
import { MobxComponent } from './mobx.component';

const routes: Routes = [
  {
    path: 'mobx',
    component: MobxComponent,
    children: [
      {
        path: 'noteboard',
        // pathMatch: 'prefix',
        component: NoteboardComponent,
        // resolve: {
        //   notes: NoteboardResolverService
        // },
        children: [
          {
            path: ':id',
            component: NoteboardComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  // providers: [NoteboardResolverService],
  exports: [RouterModule]
})
export class MobxRouteModule {}
