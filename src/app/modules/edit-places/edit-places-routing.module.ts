import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EditPlacesContainerComponent} from "./edit-places-container/edit-places-container.component";


const routes: Routes = [
  {
    path: '',
    component:EditPlacesContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditPlacesRoutingModule { }
