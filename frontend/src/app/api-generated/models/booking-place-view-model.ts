/* tslint:disable */
/* eslint-disable */
import { BookingPlaceItemTypeEnum } from '../models/booking-place-item-type-enum';
import { BookingPlaceTypeEnum } from '../models/booking-place-type-enum';
import { BookingStateEnum } from '../models/booking-state-enum';
import { UserViewModel } from '../models/user-view-model';
export interface BookingPlaceViewModel {
  availableForBooking?: boolean;
  availableFrom?: string | null;
  availableTo?: string | null;
  floorId?: number;
  id?: number;
  itemType?: BookingPlaceItemTypeEnum;
  name?: string | null;
  reservedForUserId?: number | null;
  reservedForUserVm?: UserViewModel;
  state?: BookingStateEnum;
  type?: BookingPlaceTypeEnum;
}
