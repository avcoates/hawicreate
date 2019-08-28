import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { ContactComponent } from './components/contact/contact.component';
import { RouterModule } from '@angular/router';
import { PortfolioRoutes } from './portfolio.routes';
import { PortfolioComponent } from './components/portfolio/portfolio.component';



@NgModule({
  declarations: [
    HomeComponent,
    GalleryComponent,
    ContactComponent,
    PortfolioComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(PortfolioRoutes)
  ]
})
export class PortfolioModule { }
