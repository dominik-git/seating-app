import { Routes } from '@angular/router';
import { MainLayoutComponent } from './main-layout.component'; // Assume this is a standalone component

export const APP_ROUTES: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'seating',
        loadComponent: () =>
          import(
            '../../../reserve-places/pages/reserve-place-container/reserve-place-container.component'
          ).then(m => m.ReservePlaceContainerComponent),
      },
      {
        path: 'my-reserved-places',
        loadComponent: () =>
          import(
            '../../../reserved-places/pages/reserved-places-container/reserved-places-container.component'
          ).then(m => m.ReservedPlacesContainerComponent),
      },
      {
        path: 'edit-places',
        loadComponent: () =>
          import(
            '../../../administration/pages/edit-places-container/edit-places-container.component'
          ).then(m => m.EditPlacesContainerComponent),
      },

      {
        path: 'edit-floor-container',
        loadComponent: () =>
          import(
            '../../../administration/pages/edit-floor-container/edit-floor-container.component'
          ).then(m => m.EditFloorContainerComponent),
      },
    ],
  },
];
