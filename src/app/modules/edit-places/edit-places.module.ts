import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditPlacesContainerComponent } from './edit-places-container/edit-places-container.component';
import {EditPlacesRoutingModule} from "./edit-places-routing.module";
import {SharedModule} from "../shared/shared.module";

import {MaterialModule} from "../material/material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AssignFixedPlaceDialog} from "./modals/assign-fixed-place-dialog";
import {MatLegacyAutocompleteModule as MatAutocompleteModule} from "@angular/material/legacy-autocomplete";




@NgModule({
  declarations: [EditPlacesContainerComponent, AssignFixedPlaceDialog],
  imports: [
    CommonModule,
    EditPlacesRoutingModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
  ],
})
export class EditPlacesModule {}
