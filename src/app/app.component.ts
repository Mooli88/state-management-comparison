import { Component, OnInit } from '@angular/core';
import { Router, ResolveStart } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'state-management-comparison';
  readonly navResolveStart: Observable<boolean>;

  constructor(private router: Router) {
    // Create a new Observable the publishes only the NavigationStart event
    this.navResolveStart = router.events.pipe(
      map(evt => evt instanceof ResolveStart)
    );
  }

  ngOnInit() {
  }
}
