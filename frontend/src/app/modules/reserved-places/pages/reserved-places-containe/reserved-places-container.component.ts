import { Component } from '@angular/core';
import { ReservedPlacesStore } from './reserved-places-container.store';
import { MatDialog } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { AsyncPipe, DatePipe, NgForOf, NgIf } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { CheckboxComponent } from '../../../shared/components/form/check-box/check-box.component';
import { BookingPlaceWithBookingsViewModel } from '../../../../api-generated/models/booking-place-with-bookings-view-model';
import { BookingSectionComponent } from '../../components/booking-section/booking-section.component';

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
    FormsModule,
    CheckboxComponent,
    BookingSectionComponent,
  ],
  templateUrl: './reserved-places-container.component.html',
  styleUrl: './reserved-places-container.component.scss',
  providers: [ReservedPlacesStore],
})
export class ReservedPlacesContainerComponent {
  selectFixedPlaces$ = this.reservedPlacesStore.selectFixedPlaces$;
  selectFixedParkings$ = this.reservedPlacesStore.selectFixedParkings$;
  selectFloorPlaces$ = this.reservedPlacesStore.selectFloorPlaces$;
  selectCarPlaces = this.reservedPlacesStore.selectCarPlaces;

  releasedFixedFloorPlaces$ =
    this.reservedPlacesStore.selectReleasedFixedFloorPlaces$;
  releasedFixedParking$ = this.reservedPlacesStore.selectReleasedFixedParking$;

  isLoading$ = this.reservedPlacesStore.selectIsLoading$;

  selectedBookings: { [bookingId: number]: boolean } = {};
  form: FormGroup;

  constructor(
    private readonly reservedPlacesStore: ReservedPlacesStore,
    public dialog: MatDialog,
    private fb: FormBuilder
  ) {
    this.reservedPlacesStore.getBookings();
    this.form = this.fb.group({
      fixedPlaces: new FormGroup({}),
      fixedParkings: new FormGroup({}),
      // ... other form groups
    });
  }

  toggleSelection(bookingId: number, isSelected: boolean) {
    this.selectedBookings[bookingId] = isSelected;
  }

  onOpenReleaseModal(place: BookingPlaceWithBookingsViewModel) {
    this.reservedPlacesStore.openReleaseModal(place);
  }

  deleteReleaseOfFixedPlace(data) {
    console.log('delete release:', data);
  }

  deleteBooking(data) {
    console.log('delete booking:', data);
  }
}
