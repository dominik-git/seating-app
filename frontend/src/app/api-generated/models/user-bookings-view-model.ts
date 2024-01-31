/* tslint:disable */
/* eslint-disable */
import { BookingPlaceViewModel } from '../models/booking-place-view-model';
import { UserBookingViewModel } from '../models/user-booking-view-model';
import { UserViewModel } from '../models/user-view-model';
export interface UserBookingsViewModel {
  bookedByUserVm?: UserViewModel;
  bookingsVm?: Array<UserBookingViewModel> | null;
  fixedParkingsVm?: Array<BookingPlaceViewModel> | null;
  fixedPlacesVm?: Array<BookingPlaceViewModel> | null;
  parkingsVm?: Array<UserBookingViewModel> | null;
}
