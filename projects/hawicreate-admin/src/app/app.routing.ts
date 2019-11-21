import { Routes } from '@angular/router';
import { AdminHomeComponent } from './components';

export const AdminRoutes: Routes = [


    {
        path: 'admin-home',
        component: AdminHomeComponent
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
