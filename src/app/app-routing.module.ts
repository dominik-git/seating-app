import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EnablePageGuard} from "./guards/enable-page/enable-page.guard";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'persons',
    loadChildren: () => import('./modules/persons/persons.module').then(m => m.PersonsModule)
  },
  {
    path: 'seating',
    loadChildren: () => import('./modules/seating/seating.module').then(m => m.SeatingModule)
  },
  {
    path: 'my-reserved-places',
    loadChildren: () => import('./modules/reserved-places/reserved-places.module').then(m => m.ReservedPlacesModule)
  },
  {
    path: 'edit-places',
    loadChildren: () => import('./modules/edit-places/edit-places.module').then(m => m.EditPlacesModule)
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
