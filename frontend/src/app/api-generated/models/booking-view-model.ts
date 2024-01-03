/* tslint:disable */
/* eslint-disable */
import { BookingStateEnum } from '../models/booking-state-enum';
export interface BookingViewModel {
  bookingDate?: string;
  bookingId?: number;
  bookingPlaceId?: number;
  state?: BookingStateEnum;
}
