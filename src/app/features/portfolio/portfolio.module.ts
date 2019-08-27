import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ContactComponent } from './contact/contact.component';



@NgModule({
  declarations: [
    HomeComponent,
    GalleryComponent,
    ContactComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PortfolioModule { }
