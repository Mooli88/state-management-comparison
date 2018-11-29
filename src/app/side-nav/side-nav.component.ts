import { Component, Input } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { BreakpointService } from '../shared/service/breakpoint.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent {
  @Input()
  readonly isLoading: false;

  isHandset$: Observable<boolean> = this.breakpointService.getMatchBreakpoint(
    Breakpoints.Handset
  );

  constructor(private breakpointService: BreakpointService) {}
}
