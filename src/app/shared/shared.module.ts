import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';

import { LayoutModule } from '@angular/cdk/layout';
import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatChipsModule,
  MatAutocompleteModule,
  MatSlideToggleModule,
  MatBottomSheetModule,
  MatCardModule,
  MatMenuModule,
  MatGridListModule,
  MatRippleModule,
  MatTabsModule
} from '@angular/material';
import { SearchComponent } from './component/search/search.component';
import { EditorComponent } from './component/editor/editor.component';
import { ListItemsComponent } from './component/list-items/list-items.component';
import { ColorPaletteComponent } from './component/color-palette/color-palette.component';
import { BottomSheetContainerComponent } from './component/bottom-sheet-container/bottom-sheet-container.component';
import { NoteComponent } from './component/note/note.component';
import { AuthService } from './service/auth.service';
import { environment } from 'src/environments/environment';
import { UserProfileComponent } from './component/user-profile/user-profile.component';

const ng = [CommonModule, ReactiveFormsModule];

const firestore = [
  AngularFireModule.initializeApp(environment.firebase),
  AngularFireAuthModule,
  AngularFirestoreModule
];

export const materialSideNav = [
  LayoutModule,
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule
];

export const material = [
  ...materialSideNav,
  MatFormFieldModule,
  MatSelectModule,
  MatProgressBarModule,
  MatInputModule,
  MatSlideToggleModule,
  MatProgressSpinnerModule,
  MatAutocompleteModule,
  MatCardModule,
  MatChipsModule,
  MatBottomSheetModule,
  MatGridListModule,
  MatRippleModule,
  MatTabsModule,
  MatMenuModule
];

const components = [
  BottomSheetContainerComponent,
  ColorPaletteComponent,
  EditorComponent,
  ListItemsComponent,
  NoteComponent,
  SearchComponent,
  UserProfileComponent
];

@NgModule({
  imports: [...ng, ...firestore, ...material],
  declarations: components,
  providers: [AuthService],
  entryComponents: [BottomSheetContainerComponent],
  exports: [...ng, ...material, ...components]
})
export class SharedModule {}
