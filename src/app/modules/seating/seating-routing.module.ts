import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SeatingComponent} from "./components/seating/seating.component";
import {FloorContainerComponent} from "./components/floor-container/floor-container.component";


const routes: Routes = [
  {
    path: '',
    component:FloorContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeatingRoutingModule { }
