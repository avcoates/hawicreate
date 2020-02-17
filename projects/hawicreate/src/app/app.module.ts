import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from '@admin/shared/shared.module';
import { PublicRoutes } from './app.routing';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'environments/environment';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { HomeComponent } from './components/home/home.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { ContactComponent } from './components/contact/contact.component';
import { RECAPTCHA_V3_SITE_KEY,
         RecaptchaV3Module, RecaptchaModule, RecaptchaFormsModule} from 'ng-recaptcha';
import { HttpClientModule } from '@angular/common/http';
import { ContactService, RecaptchaService } from '../services';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GalleryComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(PublicRoutes),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    AngularFirestoreModule,
    SharedModule,
    RecaptchaModule,
    RecaptchaV3Module,
    RecaptchaFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: RECAPTCHA_V3_SITE_KEY, useValue: '6LdlxdgUAAAAAFeng-hOh5zebEeEgGVwxSMEJ22x' },
    ContactService,
    RecaptchaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
