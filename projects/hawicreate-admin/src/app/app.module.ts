import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from '@app/shared/shared.module';
import { MaterialModule } from '@app/shared/material.module';
import { AppModule as BaseModule } from '@app/app.module';
import { AdminRoutes } from './app.routing';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'environments/environment';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminHomeComponent,
    AdminHomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(AdminRoutes),
    AppRoutingModule,
    NgxsModule,
    NgxsReduxDevtoolsPluginModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    AngularFirestoreModule,
    MaterialModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
