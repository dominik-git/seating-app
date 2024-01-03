import { FormControl } from '@angular/forms';

export interface FloorFormModel {
  floorDescription?: FormControl<string>;
  floorId?: FormControl<number>;
  floorName?: FormControl<string>;
  svg?: FormControl<string>;
}

export interface FloorFormModelValues {
  floorDescription?: string;
  floorId?: number;
  floorName?: string;
  svg?: string;
}
