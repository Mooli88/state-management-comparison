import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UiComponent as akitaUi } from './akita/ui/ui.component';
import { UiComponent as ngrxUi } from './ngrx/ui/ui.component';
import { UiComponent as ngxsUi } from './ngxs/ui/ui.component';

const routes: Routes = [
  { path: '', redirectTo: 'ngrx/noteboard', pathMatch: 'full' },
  // { path: 'ngrx', loadChildren: './ngrx/ngrx.module#NgrxModule' },
  // { path: 'akita', loadChildren: './akita/akita.module#AkitaModule' },
  // { path: 'ngxs', loadChildren: './ngxs/ngxs.module#NgxsAbModule' }
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
