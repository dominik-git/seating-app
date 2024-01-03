/* tslint:disable */
/* eslint-disable */
import { BookingPlaceViewModel } from '../models/booking-place-view-model';
export interface CreateFloorWithBookingPlacesRequest {
  bookingPlaces?: Array<BookingPlaceViewModel> | null;
  description?: string | null;
  name?: string | null;
  svg?: string | null;
}
