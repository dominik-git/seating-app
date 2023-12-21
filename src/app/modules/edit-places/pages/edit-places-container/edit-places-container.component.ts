import { Component, ViewChild } from '@angular/core';
import { SeatTooltipComponent } from '../../../shared/components/seat-tooltip/seat-tooltip.component';

import { StateEnum } from '../../../../enums/state.enum';
import { MatDialog } from '@angular/material/dialog';
import { ParkingPlaceSvgComponent } from '../../../shared/components/parking-place-svg/parking-place-svg.component';
import { FloorSevenSvgComponent } from '../../../shared/components/floor-seven-svg/floor-seven-svg.component';
import { FloorFiveSvgComponent } from '../../../shared/components/floor-five-svg/floor-five-svg.component';
import { AsyncPipe, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';
import { PlaceSelectorComponent } from '../../../shared/components/place-selector/place-selector.component';
import { EditPlacesContainerStore } from './edit-places-container.store';
import { GenericSvgComponent } from '../../../shared/components/generic-svg/generic-svg.component';
import { SvgFileSelectorModel } from '../../../../api/models/svg-file-model';
import { PlacesStore } from '../../../../services/places/places.store';
import { EditPlaceComponent } from '../../components/edit-place/edit-place.component';

@Component({
  selector: 'app-edit-places-container',
  templateUrl: './edit-places-container.component.html',
  styleUrls: ['./edit-places-container.component.scss'],
  standalone: true,
  imports: [
    SpinnerComponent,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatOptionModule,
    MatButtonModule,
    NgIf,
    FloorFiveSvgComponent,
    FloorSevenSvgComponent,
    ParkingPlaceSvgComponent,
    SeatTooltipComponent,
    AsyncPipe,
    PlaceSelectorComponent,
    GenericSvgComponent,
    EditPlaceComponent,
  ],
  providers: [EditPlacesContainerStore],
})
export class EditPlacesContainerComponent {
  @ViewChild(SeatTooltipComponent, { static: false })
  StateEnum = StateEnum;
  fixedPlaces: any[] = [];
  copy: any;
  isLoading$ = this.editPlacesContainerStore.isLoadingCombined$;
  fixedPlaces$ = this.editPlacesContainerStore.selectFixedPlaces$;
  selectedPlaceSvg$ = this.editPlacesContainerStore.selectSelectedPlaceSvg$;
  selectPlacesName$ = this.placesStore.selectPlacesName$;

  constructor(
    public dialog: MatDialog,
    private readonly editPlacesContainerStore: EditPlacesContainerStore,
    private readonly placesStore: PlacesStore
  ) {}

  saveFixedPlaces() {
    console.log(this.fixedPlaces);
  }

  optionChanged(state: SvgFileSelectorModel) {
    this.editPlacesContainerStore.changePlace$(state);
  }
}
