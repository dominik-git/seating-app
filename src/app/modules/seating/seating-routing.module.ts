import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservePlaceContainerComponent } from './pages/reserve-place-container/reserve-place-container.component';

const routes: Routes = [
  {
    path: '',
    component: ReservePlaceContainerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeatingRoutingModule {}
