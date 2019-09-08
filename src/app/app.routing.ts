import { Routes } from '@angular/router';
import { PortfolioComponent } from './features/portfolio/portfolio/portfolio.component';
import { AdminComponent } from './features/admin/components/admin/admin.component';
import { HomeComponent } from './features/portfolio/components/home/home.component';
import { GalleryComponent } from './features/portfolio/components/gallery/gallery.component';
import { ContactComponent } from './features/portfolio/components/contact/contact.component';
export const AppRoutes: Routes = [

    {
        path: 'portfolio',
        component: PortfolioComponent,
        children: [
            {
                path: 'home',
                component: HomeComponent
            },
            {
                path: 'gallery',
                component: GalleryComponent
            },
            {
                path: 'contact',
                component: ContactComponent
            }
        ]
    },
    {
        path: 'admin',
        component: AdminComponent
    },
    {
        path: '',
        redirectTo: 'portfolio/home',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];
