import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StringUtilities } from './format/string.utilities';



@NgModule({
  declarations: [
    StringUtilities,
  ],
  exports: [
    StringUtilities,
  ],
  imports: [
    CommonModule
  ]
})
export class UtilitesModule { }
