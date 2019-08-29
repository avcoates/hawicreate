import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { BaseState } from '../../state/base.state';
import { Observable } from 'rxjs';
import { Route } from '@angular/compiler/src/core';
import { NavbarRoute } from 'src/app/shared/models';

@Component({
  selector: 'hawicreate-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Select(BaseState.routes)
  public routes$: Observable<Array<NavbarRoute>>;

  constructor(private store: Store) {
  }

  ngOnInit() {
  }

}
