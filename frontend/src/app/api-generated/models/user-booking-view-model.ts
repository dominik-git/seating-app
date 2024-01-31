/* tslint:disable */
/* eslint-disable */
import { BookingPlaceViewModel } from '../models/booking-place-view-model';
import { BookingStateEnum } from '../models/booking-state-enum';
export interface UserBookingViewModel {
  bookedById?: number | null;
  bookingDate?: string;
  bookingId?: number;
  bookingPlaceId?: number;
  bookingPlaceVm?: BookingPlaceViewModel;
  state?: BookingStateEnum;
}
