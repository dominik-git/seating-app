/* tslint:disable */
/* eslint-disable */
import { BookingPlaceTypeEnum } from '../models/booking-place-type-enum';
export interface MultipleBookingsTypeRequest {
  ids?: Array<number> | null;
  type?: BookingPlaceTypeEnum;
}
