import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components';
import { MaterialModule } from './material.module';
import { AuthService } from './services/auth/auth.service';

import { AngularFireAuth } from '@angular/fire/auth';
import { AuthGuard } from './services/auth.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    NavbarComponent,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AuthService, AngularFireAuth, AuthGuard]
})
export class SharedModule { }
