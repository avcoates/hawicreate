import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { ContactComponent } from './components/contact/contact.component';
import { RouterModule } from '@angular/router';
import { PortfolioComponent } from './portfolio/portfolio.component';



@NgModule({
  declarations: [
    HomeComponent,
    GalleryComponent,
    ContactComponent,
    PortfolioComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class PortfolioModule { }
