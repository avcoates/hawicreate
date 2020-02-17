import { Routes } from '@angular/router';
import { HomeComponent, GalleryComponent, ContactComponent, ArtPieceComponent } from './components';

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
        path: 'art-piece/:id',
        component: ArtPieceComponent,
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
