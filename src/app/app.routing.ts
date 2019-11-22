import { Routes } from '@angular/router';
import { AdminHomeComponent, AdminGalleryComponent, AdminContactComponent } from './components';

export const AdminRoutes: Routes = [
    {
        path: 'admin-home',
        component: AdminHomeComponent
    },
    {
        path: 'admin-gallery',
        component: AdminGalleryComponent
    },
    {
        path: 'admin-contact',
        component: AdminContactComponent
    },
    {
        path: '',
        redirectTo: 'admin-home',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];
