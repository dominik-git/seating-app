/* tslint:disable */
/* eslint-disable */
import { BookingPlaceWithBookingsViewModel } from '../models/booking-place-with-bookings-view-model';
export interface FloorViewModel {
  bookingPlaces?: Array<BookingPlaceWithBookingsViewModel> | null;
  description?: string | null;
  id?: number;
  name?: string | null;
  svg?: string | null;
}
