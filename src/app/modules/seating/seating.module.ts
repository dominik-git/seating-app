import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeatingComponent } from './components/seating/seating.component';
import { SeatComponent } from './components/seat/seat.component';
import { SeatingRoutingModule } from './seating-routing.module';

import { SvgComponent } from './components/svg/svg.component';

import { ReservePlaceContainerComponent } from './pages/reserve-place-container/reserve-place-container.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SeatBookDialog } from './modals/seat-book-dialog';
import { SpaceBookTimeSlotComponent } from './components/space-book-time-slot/space-book-time-slot.component';

@NgModule({
  imports: [
    CommonModule,
    SeatingRoutingModule,
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
export class SeatingModule {}
