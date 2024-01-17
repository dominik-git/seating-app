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
            '../../../reserved-places/components/reserved-places/reserved-places.component'
          ).then(m => m.ReservedPlacesComponent),
      },
      {
        path: 'edit-places',
        loadComponent: () =>
          import(
            '../../../edit-places/pages/edit-places-container/edit-places-container.component'
          ).then(m => m.EditPlacesContainerComponent),
      },
      {
        path: 'edit-floor',
        loadComponent: () =>
          import(
            '../../../administration/pages/edit-floor/edit-floor.component'
          ).then(m => m.EditFloorComponent),
      },
    ],
  },
];
