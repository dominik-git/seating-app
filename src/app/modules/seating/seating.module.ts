import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeatingComponent } from './components/seating/seating.component';
import { SeatComponent } from './components/seat/seat.component';
import { SeatingRoutingModule } from './seating-routing.module';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { SvgComponent } from './components/svg/svg.component';
import { FloorFiveSvgComponent } from '../shared/components/floor-five-svg/floor-five-svg.component';
import { FloorSevenSvgComponent } from '../shared/components/floor-seven-svg/floor-seven-svg.component';
import { FloorContainerComponent } from './components/floor-container/floor-container.component';
import {MatLegacyFormFieldModule as MatFormFieldModule} from "@angular/material/legacy-form-field";
import {MatLegacySelectModule as MatSelectModule} from "@angular/material/legacy-select";
import {MatLegacyOptionModule as MatOptionModule} from "@angular/material/legacy-core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatLegacyInputModule as MatInputModule} from "@angular/material/legacy-input";
import { MatNativeDateModule } from '@angular/material/core';
import {MatLegacyProgressSpinnerModule as MatProgressSpinnerModule} from "@angular/material/legacy-progress-spinner";
import { SeatBookDialog} from "./modals/seat-book-dialog";
import {MatLegacyDialogModule as MatDialogModule} from "@angular/material/legacy-dialog";
import { SpaceBookTimeSlotComponent } from './components/space-book-time-slot/space-book-time-slot.component';
import {MatLegacyCheckboxModule as MatCheckboxModule} from "@angular/material/legacy-checkbox";
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
