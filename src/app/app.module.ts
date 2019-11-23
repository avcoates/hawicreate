import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AdminRoutes } from './app.routing';

import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { SharedModule } from './shared/shared.module';
import { AppState } from './state/app.state';

import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ImagesApiService } from './services/images-api.service';
import { ImagesState } from './state/images.state';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'environments/environment';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { AdminGalleryComponent } from './components/admin-gallery/admin-gallery.component';
import { AdminContactComponent } from './components/admin-contact/admin-contact.component';
import { AdminLogInComponent } from './components/admin-log-in/admin-log-in.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminHomeComponent,
    AdminGalleryComponent,
    AdminContactComponent,
    AdminLogInComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(AdminRoutes),
    NgxsModule.forRoot([AppState, ImagesState], { developmentMode: !environment.production }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    AngularFirestoreModule,
    SharedModule
  ],
  exports: [
  ],
  providers: [ImagesApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
