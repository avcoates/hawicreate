import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseComponent } from './components/base/base.component';
import { NavbarComponent } from './components/navbar/navbar.component';



@NgModule({
  declarations: [
    BaseComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule
  ]
})
export class BaseModule { }
