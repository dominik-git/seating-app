import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservedPlacesComponent } from './components/reserved-places/reserved-places.component';
import { ReservedPlacesListComponent } from './components/reserved-places-list/reserved-places-list.component';
import { SharedModule } from '../shared/shared.module';
import { ReservedPlacesRoutingModule } from './reserved-places-routing.module';
import { ReservedPlaceItemComponent } from './components/reserved-place-item/reserved-place-item.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {FormsModule} from "@angular/forms";
import {MaterialModule} from "../material/material.module";

@NgModule({
  declarations: [
    ReservedPlacesComponent,
    ReservedPlacesListComponent,
    ReservedPlaceItemComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReservedPlacesRoutingModule,
    MatCheckboxModule,
    FormsModule,
    MaterialModule,
  ],
})
export class ReservedPlacesModule {}
