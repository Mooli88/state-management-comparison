import { Routes, RouterModule } from '@angular/router';
import { UiComponent } from './ui.component';
import { NoteboardComponent } from './noteboard/noteboard.component';
import { NgModule } from '@angular/core';
import { NoteboardResolverService } from './noteboard/noteboard-resolver.service';

const routes: Routes = [
  {
    path: 'akita',
    component: UiComponent,
    children: [
      {
        path: 'noteboard',
        // pathMatch: 'prefix',
        component: NoteboardComponent,
        resolve: {
          notes: NoteboardResolverService
        },
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
  providers: [NoteboardResolverService],
  exports: [RouterModule]
})
export class UiRouteModule {}
