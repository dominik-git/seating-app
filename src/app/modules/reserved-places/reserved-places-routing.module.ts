import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ReservedPlacesListComponent} from "./components/reserved-places-list/reserved-places-list.component";



const routes: Routes = [
  {
    path: '',
    component:ReservedPlacesListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservedPlacesRoutingModule { }
