import { Routes } from '@angular/router';
import { AdminHomeComponent,
         AdminGalleryComponent,
         AdminContactComponent,
         AdminLogInComponent,
         AdminUsersComponent
} from './components';
import { AuthGuard } from './shared/services/auth.guard';
import { ArtPieceDetailComponent } from './components/admin-art-piece/art-piece-detail/art-piece-detail.component';
import { AdminUserComponent } from './components/admin-user/admin-user.component';
import { AdminArtPieceComponent } from './components/admin-art-piece/admin-art-piece.component';

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
        path: 'admin-artpieces',
        canActivate: [AuthGuard],
        component: AdminArtPieceComponent
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
        path: 'admin-users',
        canActivate: [AuthGuard],
        component: AdminUsersComponent,
    },
    {
        path: 'admin-user/:id',
        canActivate: [AuthGuard],
        component: AdminUserComponent,
    },
    {
        path: '',
        redirectTo: 'log-in',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'log-in',
        pathMatch: 'full'
    }
];
