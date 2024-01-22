/* tslint:disable */
/* eslint-disable */
import { BookingStateEnum } from '../models/booking-state-enum';
import { UserViewModel } from '../models/user-view-model';
export interface BookingViewModel {
  bookedById?: number | null;
  bookedByUserVm?: UserViewModel;
  bookingDate?: string;
  bookingId?: number;
  bookingPlaceId?: number;
  state?: BookingStateEnum;
}
