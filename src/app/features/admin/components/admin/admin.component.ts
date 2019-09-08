import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { AdminRoutes } from '../../admin.routes';
import { UpdatePageRoutesFromChild } from 'src/app/actions/app.actions';

@Component({
  selector: 'hawicreate-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private store: Store) {
    console.log('admin');
    this.store.dispatch(new UpdatePageRoutesFromChild(AdminRoutes));
  }

  ngOnInit() {
  }

}
