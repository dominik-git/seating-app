import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FloorContainerComponent } from './pages/floor-container/floor-container.component';

const routes: Routes = [
  {
    path: '',
    component: FloorContainerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeatingRoutingModule {}
