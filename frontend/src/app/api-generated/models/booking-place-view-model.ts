/* tslint:disable */
/* eslint-disable */
import { BookingPlaceItemTypeEnum } from '../models/booking-place-item-type-enum';
import { BookingPlaceTypeEnum } from '../models/booking-place-type-enum';
import { BookingStateEnum } from '../models/booking-state-enum';
export interface BookingPlaceViewModel {
  availableForBooking?: boolean;
  availableFrom?: string | null;
  availableTo?: string | null;
  floorId?: number;
  id?: number;
  itemType?: BookingPlaceItemTypeEnum;
  name?: string | null;
  state?: BookingStateEnum;
  type?: BookingPlaceTypeEnum;
}
