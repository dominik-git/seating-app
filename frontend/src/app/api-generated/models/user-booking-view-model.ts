/* tslint:disable */
/* eslint-disable */
import { BookingPlaceWithBookingsViewModel } from '../models/booking-place-with-bookings-view-model';
import { BookingStateEnum } from '../models/booking-state-enum';
export interface UserBookingViewModel {
  bookedById?: number | null;
  bookingDate?: string;
  bookingId?: number;
  bookingPlaceId?: number;
  bookingPlaceVm?: BookingPlaceWithBookingsViewModel;
  state?: BookingStateEnum;
}
