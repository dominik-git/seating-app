import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './modules/shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./modules/login/pages/login/login.component').then(
        m => m.LoginComponent
      ),
  },
  {
    path: 'app',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import(
        './modules/shared/components/main-layout/main-layout.routing'
      ).then(m => m.APP_ROUTES),
    // Main layout module will have child routes for seating, my-reserved-places, edit-places, etc.
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
