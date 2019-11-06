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
import { SharedModule } from './shared/shared.module';
import { UtilitesModule } from './utilities/utilites.module';
import { AppState } from './state/app.state';
import { NavbarComponent } from './components/navbar/navbar.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ImagesApiService } from './services/images-api.service';
import { ImagesState } from './state/images.state';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes),
    MaterialModule,
    AdminModule,
    PortfolioModule,
    NgxsModule.forRoot([AppState, ImagesState], { developmentMode: !environment.production }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    AngularFirestoreModule
  ],
  exports: [
    SharedModule,
    UtilitesModule,
    MaterialModule
  ],
  providers: [ImagesApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
