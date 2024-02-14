import { Component } from '@angular/core';
import { ReservedPlacesStore } from './reserved-places-container.store';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { AsyncPipe, DatePipe, NgForOf, NgIf } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CheckboxComponent } from '../../../shared/components/form/check-box/check-box.component';
import { BookingPlaceWithBookingsViewModel } from '../../../../api-generated/models/booking-place-with-bookings-view-model';
import { BookingSectionComponent } from '../../components/booking-section/booking-section.component';
import { BookingTypeEnum } from '../../../shared/enums/bookingType.enum';
import { MonthPickerComponent } from '../../../shared/components/month-picker/month-picker.component';
import { MatTabsModule } from '@angular/material/tabs';
import { FixedPlaceListComponent } from '../../components/fixed-place-list/fixed-place-list.component';

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
    MonthPickerComponent,
    MatTabsModule,
    FixedPlaceListComponent,
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

  protected BookingTypeEnum = BookingTypeEnum;

  constructor(private readonly reservedPlacesStore: ReservedPlacesStore) {}

  dateChanged(selectedDate: { month: number; year: number }): void {
    this.reservedPlacesStore.setSelectedMonth(selectedDate.month);
    this.reservedPlacesStore.getBookings();
  }

  onOpenReleaseModal(place: BookingPlaceWithBookingsViewModel) {
    this.reservedPlacesStore.openReleaseModal(place);
  }

  deleteBooking(bookingId: number, type: BookingTypeEnum) {
    console.log('delete booking:', bookingId);
    this.reservedPlacesStore.deleteBooking({ bookingId, bookingType: type });
  }
}
