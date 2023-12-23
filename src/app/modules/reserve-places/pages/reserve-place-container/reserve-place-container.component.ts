import { Component, OnInit, ViewChild } from '@angular/core';
import { SeatTooltipComponent } from '../../../shared/components/seat-tooltip/seat-tooltip.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ParkingPlaceSvgComponent } from '../../../shared/components/parking-place-svg/parking-place-svg.component';
import { FloorSevenSvgComponent } from '../../../shared/components/floor-seven-svg/floor-seven-svg.component';
import { FloorFiveSvgComponent } from '../../../shared/components/floor-five-svg/floor-five-svg.component';
import { AsyncPipe, NgIf } from '@angular/common';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';
import { EditPlaceComponent } from '../../../edit-places/components/edit-place/edit-place.component';
import { MatButtonModule } from '@angular/material/button';
import { PlaceSelectorComponent } from '../../../shared/components/place-selector/place-selector.component';
import { ReservePlacesContainerStore } from './reserve-places-container.store';
import { SvgFileSelectorModel } from '../../../../api/models/svg-file-model';
import { PlaceModel } from '../../../../api/models/place-model';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-reserve-place-container',
  templateUrl: './reserve-place-container.component.html',
  styleUrls: ['./reserve-place-container.component.scss'],
  standalone: true,
  imports: [
    SpinnerComponent,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatOptionModule,
    NgIf,
    FloorFiveSvgComponent,
    FloorSevenSvgComponent,
    ParkingPlaceSvgComponent,
    SeatTooltipComponent,
    AsyncPipe,
    MatNativeDateModule,
    EditPlaceComponent,
    MatButtonModule,
    PlaceSelectorComponent,
  ],
  providers: [ReservePlacesContainerStore],
})
export class ReservePlaceContainerComponent implements OnInit {
  @ViewChild(SeatTooltipComponent, { static: false })
  hello: SeatTooltipComponent;
  selectedDate: Date | null = null;
  desks: any[];
  isLoading$ = this.reservePlacesContainerStore.isLoadingCombined$;
  fixedReservedPlaces$ =
    this.reservePlacesContainerStore.selectFixedReservedPlaces$;
  selectedPlaceSvg$ = this.reservePlacesContainerStore.selectSelectedPlaceSvg$;
  selectPlacesName$ = this.reservePlacesContainerStore.selectPlacesName$;

  constructor(
    private readonly reservePlacesContainerStore: ReservePlacesContainerStore,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit() {
    this.reservePlacesContainerStore.selectSelectedDate$.subscribe(
      (date) => (this.selectedDate = date)
    );
  }

  optionChanged(state: SvgFileSelectorModel) {
    this.reservePlacesContainerStore.changePlace$(state);
  }

  dateChanged() {
    this.reservePlacesContainerStore.changeDate$(this.selectedDate);
  }

  onPlaceSelected(data: {
    placeId: string;
    fixedPlace: PlaceModel | null;
  }): void {
    if (data.fixedPlace) {
      return;
    }
    this.reservePlacesContainerStore.handlePlaceSelection({
      placeId: data.placeId,
    });

    // let dialogRef = this.dialog.open(SeatBookDialog, {
    //   data: {
    //     selectedDate: date,
    //     selectedDesk,
    //   },
    // });

    // return dialogRef.afterClosed();
  }
}
