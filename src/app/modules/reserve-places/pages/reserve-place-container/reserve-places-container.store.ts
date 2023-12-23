import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { combineLatest, EMPTY, Observable } from 'rxjs';
import {
  catchError,
  filter,
  map,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { BookingResourceService } from '../../../../api/booking/booking-resource.service';
import { PlaceModel } from '../../../../api/models/place-model';
import { PlacesStore } from '../../../../services/places/places.store';
import { SvgFileSelectorModel } from '../../../../api/models/svg-file-model';
import {
  BookDeskDay,
  BookParkingPlaceDay,
  SeatsInRange,
} from '../../../../models/booking.model';
import { MatDialog } from '@angular/material/dialog';
import { SeatBookDialog } from '../../modals/seat-book-dialog';

export interface ReservePlacesState {
  fixedReservedPlaces: PlaceModel[];
  bookedDesks: BookDeskDay[];
  bookedParkingPlace: BookParkingPlaceDay[];
  selectedDesk: any;
  seatsInDateRange: SeatsInRange[];
  selectedSeatDays: Date[];
  selectedPlaceFilter: SvgFileSelectorModel;
  isLoading: boolean;
  selectedDate: Date;
}

@Injectable()
export class ReservePlacesContainerStore extends ComponentStore<ReservePlacesState> {
  constructor(
    private readonly bookingResourceService: BookingResourceService,
    private readonly placesStore: PlacesStore,
    private readonly dialog: MatDialog
  ) {
    super({
      fixedReservedPlaces: [],
      bookedDesks: [],
      bookedParkingPlace: [],
      selectedDesk: null,
      seatsInDateRange: [],
      selectedSeatDays: [],
      selectedPlaceFilter: null,
      isLoading: false,
      selectedDate: new Date(),
    });
  }

  // SELECTORS

  readonly selectSelectedDate$: Observable<Date> = this.select(
    (state) => state.selectedDate
  );

  readonly selectFixedReservedPlaces$: Observable<PlaceModel[]> = this.select(
    (state) => state.fixedReservedPlaces
  );

  readonly selectIsLoadingReservePlacePage$: Observable<boolean> = this.select(
    (state) => state.isLoading
  );

  readonly isLoadingCombined$: Observable<boolean> = combineLatest([
    this.selectIsLoadingReservePlacePage$,
    this.placesStore.selectIsLoading$,
  ]).pipe(
    map(
      ([isLoadingReservePlace, isLoadingPlaces]) =>
        isLoadingReservePlace || isLoadingPlaces
    )
  );

  readonly selectSelectedPlaceSvg$ = this.select(
    (state) => state.selectedPlaceFilter
  ).pipe(
    filter((place) => !!place), // Filter out null or undefined
    switchMap((place) => {
      return this.placesStore.selectPlaceById$(place.id);
    })
  );

  readonly selectPlacesName$ = this.select(
    (state) => state.selectedPlaceFilter
  ).pipe(
    switchMap((place) => {
      return this.placesStore.selectPlacesName$;
    })
  );

  // ACTIONS

  readonly changePlace$ = this.effect(
    (selectedPlace$: Observable<SvgFileSelectorModel>) =>
      selectedPlace$.pipe(
        withLatestFrom(this.select((state) => state.selectedDate)),
        tap(([selectedPlaceFilter, selectedDate]) =>
          this.setSelectedPlace(selectedPlaceFilter)
        ),
        switchMap(([selectedPlaceFilter, selectedDate]) =>
          this.fetchPlaces(selectedPlaceFilter.name, selectedDate)
        )
      )
  );

  readonly handlePlaceSelection = this.effect<{ placeId: string }>((placeId$) =>
    placeId$.pipe(
      withLatestFrom(this.select((state) => state.selectedDate)),
      tap(([placeId, selectedDate]) => {
        this.setLoading(true); // Set loading to true immediately
        const dialogRef = this.dialog.open(SeatBookDialog, {
          data: {
            selectedDate: selectedDate,
            selectedDesk: placeId,
          },
        });

        dialogRef.afterClosed().subscribe((response) => {
          // Logic to handle the response
          this.setLoading(false); // Set loading to false after dialog closes
        });
      })
    )
  );

  readonly changeDate$ = this.effect((selectedDate$: Observable<Date>) =>
    selectedDate$.pipe(
      withLatestFrom(this.select((state) => state.selectedPlaceFilter)),
      tap(([selectedDate, selectedPlaceFilter]) =>
        this.setSelectedDate(selectedDate)
      ),
      switchMap(([selectedDate, selectedPlaceFilter]) =>
        this.fetchPlaces(selectedPlaceFilter.name, selectedDate)
      )
    )
  );

  // REDUCERS
  readonly setFixedReservedPlaces = this.updater(
    (state, fixedReservedPlaces: PlaceModel[]) => ({
      ...state,
      fixedReservedPlaces,
      isLoading: false,
    })
  );

  readonly setSelectedPlace = this.updater(
    (state, selectedPlaceFilter: SvgFileSelectorModel) => ({
      ...state,
      selectedPlaceFilter,
      isLoading: true,
    })
  );

  readonly setSelectedDate = this.updater((state, selectedDate: Date) => ({
    ...state,
    selectedDate,
    isLoading: true,
  }));

  readonly setLoading = this.updater((state, isLoading: boolean) => ({
    ...state,
    isLoading,
  }));

  // Private method to handle fetching of fixed places
  private fetchPlaces(
    selectedPlaceName: string,
    selectedDate: Date
  ): Observable<PlaceModel[]> {
    return this.bookingResourceService
      .getDesks(selectedDate, selectedPlaceName)
      .pipe(
        tapResponse(
          (places) => {
            this.setFixedReservedPlaces(places);
          },
          (error) => {
            this.setLoading(false);
            return EMPTY;
          }
        ),
        catchError(() => EMPTY)
      );
  }
}
