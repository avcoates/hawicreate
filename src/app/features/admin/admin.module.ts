import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminRoutes } from './admin.routes';
import { AdminComponent } from './components/admin/admin.component';



@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class AdminModule { }
