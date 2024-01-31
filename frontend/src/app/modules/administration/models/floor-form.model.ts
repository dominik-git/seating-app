import { FormControl } from '@angular/forms';
import { BookingPlaceItemTypeEnum } from '../../../api-generated/models/booking-place-item-type-enum';

export interface FloorFormModel {
  description: FormControl<string>;
  floorId?: FormControl<number>;
  name: FormControl<string>;
  svg: FormControl<string>;
  bookingPlaces?: FormControl<string[]>;
  itemType: FormControl<BookingPlaceItemTypeEnum>;
}

export interface FloorFormModelValues {
  description: string;
  floorId?: number;
  name: string;
  svg: string;
  bookingPlaces: string[];
  itemType: BookingPlaceItemTypeEnum;
}
