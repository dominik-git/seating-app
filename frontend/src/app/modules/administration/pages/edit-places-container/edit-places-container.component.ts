import { Component, ViewChild } from '@angular/core';
import { SeatTooltipComponent } from '../../../shared/components/seat-tooltip/seat-tooltip.component';
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
import { EditPlaceComponent } from '../../components/edit-place/edit-place.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { provideComponentStore } from '@ngrx/component-store';

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
    NgxSkeletonLoaderModule,
  ],
  providers: [provideComponentStore(EditPlacesContainerStore)],
})
export class EditPlacesContainerComponent {
  @ViewChild(SeatTooltipComponent, { static: false })
  fixedPlaces: any[] = [];
  copy: any;
  isLoadingCombined$ = this.editPlacesContainerStore.isLoadingCombined$;
  isLoadingFloors$ = this.editPlacesContainerStore.selectIsLoadingFloors;
  allPlaces$ = this.editPlacesContainerStore.selectAllPlaces$;
  selectedPlace$ = this.editPlacesContainerStore.selectSelectedPlace$;
  selectedPlaceSvg$ = this.editPlacesContainerStore.selectSelectedPlaceSvg$;
  selectPlacesName$ = this.editPlacesContainerStore.selectPlacesName$;

  constructor(
    public dialog: MatDialog,
    private readonly editPlacesContainerStore: EditPlacesContainerStore
  ) {}

  saveFixedPlaces() {
    console.log(this.fixedPlaces);
  }

  optionChanged(state: SvgFileSelectorModel) {
    this.editPlacesContainerStore.changePlace$(state);
  }

  onPlaceSelected(data: any): void {
    this.editPlacesContainerStore.handlePlaceSelection(data);
  }
}
