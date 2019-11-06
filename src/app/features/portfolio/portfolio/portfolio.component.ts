import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { PortfolioRoutes } from '../portfolio.routes';
import { UpdatePageRoutesFromChild } from '@app/actions/app.actions';

@Component({
  selector: 'hawicreate-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {

  constructor(private store: Store) {
    console.log('portfolio');
    this.store.dispatch(new UpdatePageRoutesFromChild(PortfolioRoutes));
  }

  ngOnInit() {
  }

}
