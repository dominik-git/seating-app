import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeatingComponent } from '../reserve-places/components/seating/seating.component';
import { SeatComponent } from '../reserve-places/components/seat/seat.component';
import { ReservePlacesRoutingModule } from './reserve-places-routing.module';

import { SvgComponent } from '../reserve-places/components/svg/svg.component';

import { ReservePlaceContainerComponent } from '../reserve-places/pages/reserve-place-container/reserve-place-container.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SeatBookDialog } from '../reserve-places/modals/seat-book-dialog';
import { SpaceBookTimeSlotComponent } from '../reserve-places/components/space-book-time-slot/space-book-time-slot.component';

@NgModule({
  imports: [
    CommonModule,
    ReservePlacesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SeatingComponent,
    SeatComponent,
    SvgComponent,
    ReservePlaceContainerComponent,
    SeatBookDialog,
    SpaceBookTimeSlotComponent,
  ],
  exports: [SeatBookDialog],
})
export class ReservePlacesModule {}
