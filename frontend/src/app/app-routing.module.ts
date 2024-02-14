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
    path: 'seating',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import(
        '../app/modules/reserve-places/pages/reserve-place-container/reserve-place-container.component'
      ).then(m => m.ReservePlaceContainerComponent),
  },
  {
    path: 'my-reserved-places',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import(
        '../app/modules/reserved-places/pages/reserved-places-container/reserved-places-container.component'
      ).then(m => m.ReservedPlacesContainerComponent),
  },
  {
    path: 'edit-places',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import(
        '../app/modules/administration/pages/edit-places-container/edit-places-container.component'
      ).then(m => m.EditPlacesContainerComponent),
  },

  {
    path: 'edit-floor-container',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import(
        '../app/modules//administration/pages/edit-floor-container/edit-floor-container.component'
      ).then(m => m.EditFloorContainerComponent),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
