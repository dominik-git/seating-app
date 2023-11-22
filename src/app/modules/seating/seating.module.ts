import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeatingComponent } from './components/seating/seating.component';
import { SeatComponent } from './components/seat/seat.component';
import { SeatingRoutingModule } from './seating-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SvgComponent } from './components/svg/svg.component';
import { FloorFiveSvgComponent } from '../shared/components/floor-five-svg/floor-five-svg.component';
import { FloorSevenSvgComponent } from '../shared/components/floor-seven-svg/floor-seven-svg.component';
import { FloorContainerComponent } from './components/floor-container/floor-container.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatOptionModule} from "@angular/material/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";
import { MatNativeDateModule } from '@angular/material/core';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { SeatBookDialog} from "./modals/seat-book-dialog";
import {MatDialogModule} from "@angular/material/dialog";
import { SpaceBookTimeSlotComponent } from './components/space-book-time-slot/space-book-time-slot.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {SharedModule} from "../shared/shared.module";
import { ParkingPlaceSvgComponent } from '../shared/components/parking-place-svg/parking-place-svg.component';
import {MaterialModule} from "../material/material.module";


@NgModule({
  declarations: [
    SeatingComponent,
    SeatComponent,
    SvgComponent,
    FloorContainerComponent,
    SeatBookDialog,
    SpaceBookTimeSlotComponent,
  ],
    imports: [
        CommonModule,
        SeatingRoutingModule,
        FormsModule,
        SharedModule,
        MaterialModule,
        ReactiveFormsModule

    ],
  exports: [
    SeatBookDialog,
  ],
})
export class SeatingModule {}
