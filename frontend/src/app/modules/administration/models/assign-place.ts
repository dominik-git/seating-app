import { BookingPlaceTypeEnum } from '../../../api-generated/models/booking-place-type-enum';

export interface AssignPlace {
  name: string;
  id: number;
  type: BookingPlaceTypeEnum;
  reservedForId?: number;
}
