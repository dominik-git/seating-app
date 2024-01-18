import { FormControl } from '@angular/forms';

export interface FloorFormModel {
  description: FormControl<string>;
  floorId?: FormControl<number>;
  name: FormControl<string>;
  svg: FormControl<string>;
  bookingPlaces?: FormControl<string[]>;
}

export interface FloorFormModelValues {
  description: string;
  floorId?: number;
  name: string;
  svg: string;
  bookingPlaces: string[];
}
