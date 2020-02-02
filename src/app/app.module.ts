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
import { ImageApiService } from './services/image-api.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'environments/environment';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { AdminGalleryComponent } from './components/admin-gallery/admin-gallery.component';
import { AdminContactComponent } from './components/admin-contact/admin-contact.component';
import { AdminLogInComponent } from './components/admin-log-in/admin-log-in.component';

import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { ArtPieceDetailComponent } from './components/admin-gallery/art-piece-detail/art-piece-detail.component';
import { ImageUploadComponent } from './components/admin-gallery/image-upload/image-upload.component';
import { AdminUsersComponent } from './components/admin-users/admin-users.component';
import { UserApiService } from './services';
import { AdminUserComponent } from './components/admin-user/admin-user.component';
import { GalleryState } from './state/gallery.state';
import { ArtPieceState } from './state/art-piece.state';
import { AdminArtPieceComponent } from './components/admin-art-piece/admin-art-piece.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminHomeComponent,
    AdminGalleryComponent,
    AdminContactComponent,
    AdminLogInComponent,
    ArtPieceDetailComponent,
    ImageUploadComponent,
    AdminUsersComponent,
    AdminUserComponent,
    AdminArtPieceComponent,
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
  exports: [
  ],
  providers: [ImageApiService, UserApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
