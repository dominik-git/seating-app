import { FormControl } from '@angular/forms';

export interface FloorFormModel {
  description?: FormControl<string>;
  floorId?: FormControl<number>;
  name?: FormControl<string>;
  svg?: FormControl<string>;
}

export interface FloorFormModelValues {
  floorDescription?: string;
  floorId?: number;
  floorName?: string;
  svg?: string;
}
