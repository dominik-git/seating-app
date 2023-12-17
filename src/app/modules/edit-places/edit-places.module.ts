import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditPlacesContainerComponent } from './edit-places-container/edit-places-container.component';
import { EditPlacesRoutingModule } from './edit-places-routing.module';



import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AssignFixedPlaceDialog } from './modals/assign-fixed-place-dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
    imports: [
    CommonModule,
    EditPlacesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    EditPlacesContainerComponent, AssignFixedPlaceDialog,
],
})
export class EditPlacesModule {}
