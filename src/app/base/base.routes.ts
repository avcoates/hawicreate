import { Routes } from '@angular/router';
import { PortfolioComponent } from '../features/portfolio/components/portfolio/portfolio.component';
import { AdminComponent } from '../features/admin/components/admin/admin.component';
import { FullscreenOverlayContainer } from '@angular/cdk/overlay';

export const BaseRoutes: Routes = [
    {
        path: 'portfolio',
        component: PortfolioComponent,
        loadChildren: () => import('../features/portfolio/portfolio.module').then(mod => mod.PortfolioModule)
    },
    {
        path: 'admin',
        component: AdminComponent,
            loadChildren: () => import('../features/admin/admin.module').then(mod => mod.AdminModule)
    },
    {
        path: '',
        redirectTo: 'portfolio',
        pathMatch: 'full'
    }
];
