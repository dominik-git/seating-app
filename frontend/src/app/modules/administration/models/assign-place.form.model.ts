import { FormControl } from '@angular/forms';
import { BookingPlaceTypeEnum } from '../../../api-generated/models/booking-place-type-enum';
import { UserViewModel } from '../../../api-generated/models/user-view-model';

export interface AssignPlaceFormModel {
  assignee: FormControl<UserViewModel>;
  type: FormControl<BookingPlaceTypeEnum>;
  name: FormControl<string>;
  id: FormControl<number>;
}
