/* tslint:disable */
/* eslint-disable */
import { BookingStateEnum } from '../models/booking-state-enum';
export interface BookingViewModel {
  bookedById?: number | null;
  bookingDate?: string;
  bookingId?: number;
  bookingPlaceId?: number;
  state?: BookingStateEnum;
}
