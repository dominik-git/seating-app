/* tslint:disable */
/* eslint-disable */
import { BookingPlaceTypeEnum } from '../models/booking-place-type-enum';
export interface BookingTypeRequest {
  id?: number;
  reservedForId?: number | null;
  type?: BookingPlaceTypeEnum;
}
