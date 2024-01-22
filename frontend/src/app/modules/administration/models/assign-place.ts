import { BookingPlaceTypeEnum } from '../../../api-generated/models/booking-place-type-enum';
import { UserViewModel } from '../../../api-generated/models/user-view-model';

export interface AssignPlace {
  name: string;
  id: number;
  type: BookingPlaceTypeEnum;
  user?: UserViewModel;
}
