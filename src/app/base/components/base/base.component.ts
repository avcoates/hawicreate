import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { BaseState } from '../../state/base.state';
import { Route } from '@angular/compiler/src/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'hawicreate-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent {

  @Select(BaseState.routes)
  public routes$: Observable<Array<Route>>;

  constructor(private store: Store) {
    this.routes$.subscribe(r => console.log(r));
  }


}
