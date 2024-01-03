/* tslint:disable */
/* eslint-disable */
import { BookingPlaceWithBookingsViewModel } from '../models/booking-place-with-bookings-view-model';
export interface FloorViewModel {
  bookingPlaces?: Array<BookingPlaceWithBookingsViewModel> | null;
  floorDescription?: string | null;
  floorId?: number;
  floorName?: string | null;
  svg?: string | null;
}
