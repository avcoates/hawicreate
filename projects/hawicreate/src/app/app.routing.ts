import { Routes } from '@angular/router';
import { HomeComponent, GalleryComponent, ContactComponent } from './components';

export const PublicRoutes: Routes = [


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
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];
