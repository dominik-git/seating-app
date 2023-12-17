import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeatingComponent } from './components/seating/seating.component';
import { SeatComponent } from './components/seat/seat.component';
import { SeatingRoutingModule } from './seating-routing.module';

import { SvgComponent } from './components/svg/svg.component';

import { FloorContainerComponent } from './components/floor-container/floor-container.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SeatBookDialog } from './modals/seat-book-dialog';
import { SpaceBookTimeSlotComponent } from './components/space-book-time-slot/space-book-time-slot.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';

@NgModule({
    imports: [
        CommonModule,
        SeatingRoutingModule,
        FormsModule,
        SharedModule,
        MaterialModule,
        ReactiveFormsModule,
        SeatingComponent,
        SeatComponent,
        SvgComponent,
        FloorContainerComponent,
        SeatBookDialog,
        SpaceBookTimeSlotComponent,
    ],
    exports: [SeatBookDialog],
})
export class SeatingModule {}
