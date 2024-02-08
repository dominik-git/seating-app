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
  take,
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
import { startOfDay } from 'date-fns';

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
      selectedDate: startOfDay(new Date()),
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
      // Ensure floors loading state is not loading before proceeding
      switchMap(() =>
        this.selectIsLoadingFloors.pipe(
          filter(isLoading => !isLoading),
          take(1) // Ensure we only proceed once after loading is done
        )
      ),
      // Use withLatestFrom to get the latest values from places and selected date
      withLatestFrom(
        this.placesStore.selectPlacesName$,
        this.selectSelectedDate$
      ),
      // Proceed only if places are available
      filter(([_, places]) => places && places.length > 0),
      tap(([_, places, date]) => {
        // Set the selected place to the first item in places if not already set
        if (!this.get().selectedPlaceFilter) {
          this.setSelectedPlace(places[0]);
        }
        // Fetch more data based on the selected place and date
        this.fetchPlaces(places[0].id, date).subscribe();
      }),
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
      withLatestFrom(this.selectSelectedDate$, this.selectSelectedPlaceFilter$),
      tap(([placeId, selectedDate, selectedFloor]) => {
        this.setLoading(true); // Set loading to true immediately
        const dialogRef = this.dialog.open(SeatBookDialog, {
          data: {
            selectedDate,
            placeId,
          },
        });

        dialogRef
          .afterClosed()
          .pipe(
            switchMap(response => {
              if (response === true) {
                return this.fetchPlaces(selectedFloor.id, selectedDate);
              } else {
                this.setLoading(false);
                return EMPTY;
              }
              // Fetch updated places based on the selected floor and date
            }),

            catchError(error => {
              console.error('Error fetching places:', error);
              this.setLoading(false);
              return EMPTY;
            })
          )
          .subscribe();
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
