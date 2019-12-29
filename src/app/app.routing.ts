import { Routes } from '@angular/router';
import { AdminHomeComponent, AdminGalleryComponent, AdminContactComponent, AdminLogInComponent } from './components';
import { AuthGuard } from './shared/services/auth.guard';
import { ArtPieceDetailComponent } from './components/admin-gallery/art-piece-detail/art-piece-detail.component';

export const AdminRoutes: Routes = [
    {
        path: 'log-in',
        component: AdminLogInComponent
    },
    {
        path: 'admin-home',
        canActivate: [AuthGuard],
        component: AdminHomeComponent
    },
    {
        path: 'admin-gallery',
        canActivate: [AuthGuard],
        component: AdminGalleryComponent
    },
    {
        path: 'admin-gallery/:id',
        canActivate: [AuthGuard],
        component: ArtPieceDetailComponent
    },
    {
        path: 'admin-contact',
        canActivate: [AuthGuard],
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
