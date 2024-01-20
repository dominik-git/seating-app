import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { FloorSimpleViewModel } from '../../../../api-generated/models/floor-simple-view-model';
import { EMPTY, Observable } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { FloorFormModelValues } from '../../models/floor-form.model';
import { FloorService } from '../../../../api-generated/services/floor.service';
import { PlacesStore } from '../../../shared/services/places.store';
import { FloorCreationModalComponent } from '../../components/floor-creation-modal/floor-creation-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { CreateFloorWithBookingPlacesRequest } from '../../../../api-generated/models/create-floor-with-booking-places-request';
import { BookingPlaceTypeEnum } from '../../../../api-generated/models/booking-place-type-enum';

export interface FloorFormState {
  floors: FloorSimpleViewModel[];
  floor: FloorSimpleViewModel;
  error: any;
  isLoading: boolean;
}

@Injectable()
export class EditFloorStore extends ComponentStore<FloorFormState> {
  constructor(
    private readonly floorService: FloorService,
    private readonly placesStore: PlacesStore,
    public dialog: MatDialog
  ) {
    super({ floors: [], floor: null, isLoading: false, error: null });
  }

  // SELECTORS
  readonly floor$: Observable<FloorSimpleViewModel | null> = this.select(
    state => state.floor
  );
  readonly floors$: Observable<FloorSimpleViewModel[]> =
    this.placesStore.selectFloors$;

  readonly isLoadingFloors$: Observable<boolean> =
    this.placesStore.selectIsLoading$;

  readonly isLoading$: Observable<boolean> = this.select(
    state => state.isLoading
  );
  readonly error$: Observable<string | null> = this.select(
    state => state.error
  );

  // UPDATERS
  readonly setFloor = this.updater((state, floor: FloorSimpleViewModel) => ({
    ...state,
    floor,
  }));

  readonly setLoading = this.updater((state, isLoading: boolean) => ({
    ...state,
    isLoading,
  }));

  readonly setError = this.updater((state, error: string | null) => ({
    ...state,
    error,
  }));

  // EFFECTS

  readonly openCreateFloorModal = this.effect((trigger$: Observable<void>) =>
    trigger$.pipe(
      tap(() => {
        const dialogRef = this.dialog.open(FloorCreationModalComponent, {
          width: '400px',
          data: {}, // Pass data if needed
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed', result);
          // Handle the result here, possibly call saveFloor
          if (result) {
            this.saveFloor(result);
          }
        });
      })
    )
  );

  readonly saveFloor = this.effect((floor$: Observable<FloorFormModelValues>) =>
    floor$.pipe(
      tap(() => this.setLoading(true)),
      // Add logic to load floor data
      switchMap(formData => {
        const data: CreateFloorWithBookingPlacesRequest = {
          bookingPlaces: formData.bookingPlaces.map(id => ({
            name: id,
            type: BookingPlaceTypeEnum.$1,
          })),
          description: formData.description,
          name: formData.name,
          svg: formData.svg,
        };
        return this.floorService
          .apiFloorCreateWithBookingPlacesPost$Plain({
            body: {
              ...data,
            },
          })
          .pipe(
            tapResponse(
              places => {
                this.setLoading(false);
                this.placesStore.loadSvgPlaces$();
              },
              error => {
                this.setLoading(false);
                return EMPTY;
              }
            ),
            catchError(() => EMPTY)
          );
      })
    )
  );
}
