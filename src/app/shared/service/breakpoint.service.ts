import { Injectable } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { tap, map } from 'rxjs/operators';
import { constructor } from 'q';
import { Observable } from 'rxjs';
import { SharedModule } from '../shared.module';

@Injectable({
  providedIn: SharedModule
})
export class BreakpointService {
  getMatchBreakpoint(mediaQuery: string): Observable<boolean> {
    return this.breakpointObserver
      .observe(mediaQuery)
      .pipe(map(result => result.matches));
  }

  constructor(private breakpointObserver: BreakpointObserver) {}
}
