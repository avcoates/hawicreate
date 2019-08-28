import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseComponent } from './components/base/base.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { BaseRoutes } from './base.routes';


@NgModule({
  declarations: [
    BaseComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(BaseRoutes)
  ],
  exports: [
    BaseComponent
  ]
})
export class BaseModule { }
