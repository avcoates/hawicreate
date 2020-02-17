import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AdminRoutes } from './app.routing';

import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { SharedModule } from './shared/shared.module';

import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ImageApiService } from './shared/services/data/image-api.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'environments/environment';


import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { UserApiService, ArtPieceApiService, ImageStorageApiService } from '@shared/services/data';

import {
  AdminHomeComponent,
  AdminGalleryComponent,
  AdminContactComponent,
  AdminLogInComponent,
  ImageUploadComponent,
  AdminUserComponent,
  AdminUsersComponent,
  AdminArtPieceComponent,
  NewArtPieceDialogComponent
} from './components';
import { AppState, ArtPieceState, GalleryState } from './state';


@NgModule({
  declarations: [
    AppComponent,
    AdminHomeComponent,
    AdminGalleryComponent,
    AdminContactComponent,
    AdminLogInComponent,
    ImageUploadComponent,
    AdminUsersComponent,
    AdminUserComponent,
    AdminArtPieceComponent,
    NewArtPieceDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(AdminRoutes),
    NgxsModule.forRoot([AppState, ArtPieceState, GalleryState], { developmentMode: !environment.production }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsStoragePluginModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    AngularFirestoreModule,
    SharedModule
  ],
  exports: [],
  providers: [ArtPieceApiService, ImageApiService, ImageStorageApiService, UserApiService],
  bootstrap: [AppComponent],
  entryComponents: [ NewArtPieceDialogComponent ]
})
export class AppModule { }
