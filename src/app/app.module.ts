import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { RouterModule } from '@angular/router';
import { AppRoutes } from './app.routing';
import { BaseModule } from './base/base.module';
import { AdminModule } from './features/admin/admin.module';
import { PortfolioModule } from './features/portfolio/portfolio.module';

import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(AppRoutes),
    MaterialModule,
    BaseModule,
    AdminModule,
    PortfolioModule,
    NgxsModule.forRoot([
    ]),
    NgxsReduxDevtoolsPluginModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
