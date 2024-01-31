/* tslint:disable */
/* eslint-disable */
import { BookingPlaceItemTypeEnum } from '../models/booking-place-item-type-enum';
import { BookingPlaceTypeEnum } from '../models/booking-place-type-enum';
import { BookingViewModel } from '../models/booking-view-model';
import { UserViewModel } from '../models/user-view-model';
export interface BookingPlaceWithBookingsViewModel {
  bookings?: Array<BookingViewModel> | null;
  floorId?: number;
  id?: number;
  itemType?: BookingPlaceItemTypeEnum;
  name?: string | null;
  reservedForUserId?: number | null;
  reservedForUserVm?: UserViewModel;
  type?: BookingPlaceTypeEnum;
}
