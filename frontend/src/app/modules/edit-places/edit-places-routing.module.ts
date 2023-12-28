import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditPlacesContainerComponent } from './pages/edit-places-container/edit-places-container.component';

const routes: Routes = [
  {
    path: '',
    component: EditPlacesContainerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditPlacesRoutingModule {}
