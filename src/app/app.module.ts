import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MaterialModule } from './shared/material.module';
import { RouterModule, Router } from '@angular/router';
import { AppRoutes } from './app.routing';
import { AdminModule } from './features/admin/admin.module';
import { PortfolioModule } from './features/portfolio/portfolio.module';

import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { environment } from 'src/environments/environment';
import { SharedModule } from './shared/shared.module';
import { UtilitesModule } from './utilities/utilites.module';
import { AppState } from './state/app.state';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(AppRoutes),
    MaterialModule,
    AdminModule,
    PortfolioModule,
    NgxsModule.forRoot([AppState], { developmentMode: !environment.production }),
    NgxsReduxDevtoolsPluginModule.forRoot()
  ],
  exports: [
    SharedModule,
    UtilitesModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
