import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Route } from '@angular/compiler/src/core';
import { NavbarRoute } from 'src/app/shared/models';
import { Router } from '@angular/router';
import { AppState } from 'src/app/state/app.state';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'hawicreate-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Select(AppState.routes)
  public routes$: Observable<Array<NavbarRoute>>;

  @Select(AppState.pageBase)
  public pageBase$: Observable<string>;

  constructor(private store: Store,
              private router: Router) {
    console.log('navbar');
    this.routes$.pipe(tap(console.log));
  }

  ngOnInit() {
  }

  public onNavigate(path: string): void {
    this.router.navigateByUrl(path);
  }
}
