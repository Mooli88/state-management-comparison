import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { SideNavComponent } from './side-nav/side-nav.component';
import { materialSideNav } from './shared/shared.module';
import { BreakpointService } from './shared/service/breakpoint.service';
import { AkitaModule } from './akita/akita.module';
import { NgrxModule } from './ngrx/ngrx.module';
import { NgxsAbModule } from './ngxs/ngxs.module';
import { MatProgressSpinnerModule } from '@angular/material';
import { MobxModule } from './mobx/mobx.module';

@NgModule({
  declarations: [AppComponent, SideNavComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    ...materialSideNav,
    AkitaModule,
    NgrxModule,
    NgxsAbModule,
    MobxModule,
    AppRoutingModule
    // NOTE: According to the NGXS docs, there is a need to include NgxsModule.forRoot([]) even if our states are feature states.
    //       But its seems to work in the feature module anyway :P.
    // NgxsModule.forRoot([], { developmentMode: true }),
    // NgxsReduxDevtoolsPluginModule.forRoot({ maxAge: 8 }),

    // NOTE: Akita Devtool seems to not work for lazy loaded modules
    // AkitaNgDevtools.forRoot({ maxAge: 8 })
  ],
  providers: [BreakpointService],
  bootstrap: [AppComponent]
})
export class AppModule {}
