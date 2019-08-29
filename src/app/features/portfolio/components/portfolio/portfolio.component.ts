import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { UpdatePageRoutesFromChild } from 'src/app/base/actions/base.actions';
import { PortfolioRoutes } from '../../portfolio.routes';

@Component({
  selector: 'hawicreate-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {

  constructor(private store: Store) {
    this.store.dispatch(new UpdatePageRoutesFromChild(PortfolioRoutes));
  }

  ngOnInit() {
  }

}
