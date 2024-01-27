import { Component } from '@angular/core';
import { ReservedPlacesStore } from './reserved-places-container.store';
import { MatDialog } from '@angular/material/dialog';
import { BookingViewModel } from '../../../../api-generated/models/booking-view-model';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { AsyncPipe, DatePipe, NgForOf, NgIf } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-reserved-places-container',
  standalone: true,
  imports: [
    MatListModule,
    MatIconModule,
    AsyncPipe,
    MatGridListModule,
    MatButtonModule,
    NgForOf,
    NgIf,
    DatePipe,
  ],
  templateUrl: './reserved-places-container.component.html',
  styleUrl: './reserved-places-container.component.scss',
  providers: [ReservedPlacesStore],
})
export class ReservedPlacesContainerComponent {
  bookings$: Observable<BookingViewModel[]> =
    this.reservedPlacesStore.selectBookings$;
  isLoading$ = this.reservedPlacesStore.selectIsLoading$;

  constructor(
    private readonly reservedPlacesStore: ReservedPlacesStore,
    public dialog: MatDialog // If using dialogs for update/delete
  ) {
    this.reservedPlacesStore.getBookings();
  }

  updateBooking(booking: BookingViewModel): void {
    // Logic to open a dialog or navigate to an update page
    // e.g., this.dialog.open(UpdateBookingDialogComponent, { data: { booking } });
  }

  deleteBooking(booking: BookingViewModel): void {
    // Logic to delete the booking
    // e.g., call a method from reservedPlacesStore to delete the booking
    // this.reservedPlacesStore.deleteBooking(booking.id);
  }
}
