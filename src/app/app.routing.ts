import { Routes } from '@angular/router';
import { AdminHomeComponent,
         AdminGalleryComponent,
         AdminContactRequestComponent,
         AdminLogInComponent,
         AdminUsersComponent,
         AdminUserComponent,
         AdminArtPieceComponent
} from './components';
import { AuthGuard } from './shared/services/auth.guard';

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
        path: 'admin-artpiece/:id',
        canActivate: [AuthGuard],
        component: AdminArtPieceComponent
    },
    {
        path: 'admin-contact',
        canActivate: [AuthGuard],
        component: AdminContactRequestComponent
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
