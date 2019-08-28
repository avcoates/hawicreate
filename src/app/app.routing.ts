import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PortfolioComponent } from './features/portfolio/components/portfolio/portfolio.component';
import { AdminComponent } from './features/admin/components/admin/admin.component';
import { BaseComponent } from './base/components/base/base.component';
export const AppRoutes: Routes = [
    {
        path: '',
        component: AppComponent
    }
];
