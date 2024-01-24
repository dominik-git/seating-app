import { Injectable } from '@angular/core';
import {
  ComponentStore,
  OnStoreInit,
  tapResponse,
} from '@ngrx/component-store';
import { combineLatest, EMPTY, Observable } from 'rxjs';
import {
  catchError,
  filter,
  map,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { PlaceModel } from '../../../../api/models/place-model';
import { PlacesStore } from '../../../shared/services/places.store';
import { SvgFileSelectorModel } from '../../../../api/models/svg-file-model';
import {
  BookDeskDay,
  BookParkingPlaceDay,
  SeatsInRange,
} from '../../../../models/booking.model';
import { MatDialog } from '@angular/material/dialog';
import { SeatBookDialog } from '../../modals/seat-book-dialog';
import { BookingPlaceWithBookingsViewModel } from '../../../../api-generated/models/booking-place-with-bookings-view-model';
import { BookingService } from '../../../../api-generated/services/booking.service';
import { FloorViewModelBaseResponse } from '../../../../api-generated/models/floor-view-model-base-response';

export interface ReservePlacesState {
  allPlaces: BookingPlaceWithBookingsViewModel[];
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
export class ReservePlacesContainerStore
  extends ComponentStore<ReservePlacesState>
  implements OnStoreInit
{
  constructor(
    private bookingService: BookingService,
    private readonly placesStore: PlacesStore,
    private readonly dialog: MatDialog
  ) {
    super({
      allPlaces: [],
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

  ngrxOnStoreInit() {
    this.setDefaultPlace$();
  }

  // SELECTORS

  readonly selectSelectedDate$: Observable<Date> = this.select(
    state => state.selectedDate
  );

  readonly selectSelectedPlaceFilter$: Observable<SvgFileSelectorModel> =
    this.select(state => state.selectedPlaceFilter);

  readonly selectAllPlaces$: Observable<BookingPlaceWithBookingsViewModel[]> =
    this.select(state => state.allPlaces);

  readonly selectIsLoadingReservePlacePage$: Observable<boolean> = this.select(
    state => state.isLoading
  );

  readonly selectIsLoadingFloors: Observable<boolean> =
    this.placesStore.selectIsLoading$;

  readonly isLoadingCombined$: Observable<boolean> = combineLatest([
    this.selectIsLoadingReservePlacePage$,
    this.selectIsLoadingFloors,
  ]).pipe(
    map(
      ([isLoadingReservePlace, isLoadingPlaces]) =>
        isLoadingReservePlace || isLoadingPlaces
    )
  );

  readonly selectSelectedPlaceSvg$ = this.select(
    state => state.selectedPlaceFilter
  ).pipe(
    filter(place => !!place), // Filter out null or undefined
    switchMap(place => {
      return this.placesStore.selectPlaceById$(place.id);
    })
  );

  readonly selectPlacesName$ = this.select(
    state => state.selectedPlaceFilter
  ).pipe(
    switchMap(place => {
      return this.placesStore.selectPlacesName$;
    })
  );

  // ACTIONS

  readonly setDefaultPlace$ = this.effect<void>(trigger$ =>
    trigger$.pipe(
      switchMap(() =>
        combineLatest([
          this.selectIsLoadingFloors,
          this.placesStore.selectPlacesName$,
          this.selectSelectedDate$,
        ])
      ),
      // Proceed only when isLoading is false and places are available
      filter(
        ([isLoading, places]) => !isLoading && places && places.length > 0
      ),
      // Set the selected place to the first item in places
      tap(([isLoading, places]) => {
        this.setSelectedPlace(places[0]);
      }),
      // Continue with additional actions if necessary
      switchMap(([isLoading, places, date]) => {
        // Fetch more data based on the selected place
        return this.fetchPlaces(places[0].id, date);
      }),
      // Handle any errors
      catchError(error => {
        console.error('Error in setDefaultPlace$:', error);
        return EMPTY;
      })
    )
  );

  readonly changePlace$ = this.effect(
    (selectedPlace$: Observable<SvgFileSelectorModel>) =>
      selectedPlace$.pipe(
        withLatestFrom(this.select(state => state.selectedDate)),
        tap(([selectedPlaceFilter, selectedDate]) =>
          this.setSelectedPlace(selectedPlaceFilter)
        ),
        switchMap(([selectedPlaceFilter, selectedDate]) =>
          this.fetchPlaces(selectedPlaceFilter.id, selectedDate)
        )
      )
  );

  readonly handlePlaceSelection = this.effect<number>(placeId$ =>
    placeId$.pipe(
      withLatestFrom(this.select(state => state.selectedDate)),
      tap(([placeId, selectedDate]) => {
        this.setLoading(true); // Set loading to true immediately
        const dialogRef = this.dialog.open(SeatBookDialog, {
          data: {
            selectedDate,
            placeId,
          },
        });

        dialogRef.afterClosed().subscribe(response => {
          // Logic to handle the response
          this.setLoading(false); // Set loading to false after dialog closes
        });
      })
    )
  );

  readonly changeDate$ = this.effect((selectedDate$: Observable<Date>) =>
    selectedDate$.pipe(
      withLatestFrom(this.select(state => state.selectedPlaceFilter)),
      tap(([selectedDate, selectedPlaceFilter]) =>
        this.setSelectedDate(selectedDate)
      ),
      switchMap(([selectedDate, selectedPlaceFilter]) =>
        this.fetchPlaces(selectedPlaceFilter.id, selectedDate)
      )
    )
  );

  // REDUCERS
  readonly setPlaces = this.updater(
    (state, allPlaces: BookingPlaceWithBookingsViewModel[]) => {
      return { ...state, allPlaces, isLoading: false };
    }
  );
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
    floorId: number,
    bookingDate: Date
  ): Observable<FloorViewModelBaseResponse> {
    return this.bookingService
      .apiBookingGetAllByFloorAndDateGet$Json({
        floorId,
        bookingDate: bookingDate.toISOString(),
      })
      .pipe(
        tapResponse(
          places => {
            this.setPlaces(places.data.bookingPlaces ?? []);
          },
          error => {
            this.setLoading(false);
            return EMPTY;
          }
        ),
        catchError(() => EMPTY)
      );
  }
}
