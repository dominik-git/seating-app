/* tslint:disable */
/* eslint-disable */
import { BookingPlaceWithBookingsViewModel } from '../models/booking-place-with-bookings-view-model';
import { UserBookingViewModel } from '../models/user-booking-view-model';
import { UserViewModel } from '../models/user-view-model';
export interface UserBookingsViewModel {
  bookedByUserVm?: UserViewModel;
  bookingsVm?: Array<UserBookingViewModel> | null;
  fixedParkingsVm?: Array<BookingPlaceWithBookingsViewModel> | null;
  fixedPlacesVm?: Array<BookingPlaceWithBookingsViewModel> | null;
  parkingsVm?: Array<UserBookingViewModel> | null;
}
