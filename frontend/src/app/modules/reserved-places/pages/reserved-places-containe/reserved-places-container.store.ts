import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { MatDialog } from '@angular/material/dialog';
import { EMPTY, Observable } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { BookingService } from '../../../../api-generated/services/booking.service';
import { BookingViewModel } from '../../../../api-generated/models/booking-view-model';
import { UserBookingsViewModel } from '../../../../api-generated/models/user-bookings-view-model';

export interface ReservedPlacesState {
  fixedPlaces: BookingViewModel[];
  fixedParkings: BookingViewModel[];
  floorPlaces: BookingViewModel[];
  carPlaces: BookingViewModel[];
  error: any;
  isLoading: boolean;
}

@Injectable()
export class ReservedPlacesStore extends ComponentStore<ReservedPlacesState> {
  constructor(
    private readonly bookingService: BookingService,
    public dialog: MatDialog
  ) {
    super({
      fixedPlaces: [],
      fixedParkings: [],
      floorPlaces: [],
      carPlaces: [],
      isLoading: false,
      error: null,
    });
  }

  // SELECTORS

  readonly selectIsLoading$: Observable<boolean> = this.select(
    state => state.isLoading
  );
  readonly selectFixedPlaces$ = this.select(state => state.fixedPlaces);
  readonly selectFixedParkings$ = this.select(state => state.fixedParkings);
  readonly selectFloorPlaces$ = this.select(state => state.floorPlaces);
  readonly selectCarPlaces = this.select(state => state.carPlaces);
  readonly error$: Observable<string | null> = this.select(
    state => state.error
  );

  // UPDATERS
  readonly setBookings = this.updater(
    (state, bookings: UserBookingsViewModel) => ({
      ...state,
      fixedPlaces: bookings.fixedPlacesVm,
      fixedParkings: bookings.fixedParkingsVm,
      floorPlaces: bookings.bookingsVm,
      carPlaces: bookings.parkingsVm,
      isLoading: false,
    })
  );

  readonly setLoading = this.updater((state, isLoading: boolean) => ({
    ...state,
    isLoading,
  }));

  readonly setError = this.updater((state, error: string | null) => ({
    ...state,
    error,
  }));

  // EFFECTS
  GetAllByUserId;
  readonly getBookings = this.effect((trigger$: Observable<void>) => {
    return trigger$.pipe(
      // 👇 Handle race condition with the proper choice of the flattening operator.
      tap(() => this.setLoading(true)),
      switchMap(id =>
        this.bookingService.apiBookingGetAllByUserIdGet$Json().pipe(
          //👇 Act on the result within inner pipe.
          tap({
            next: response => this.setBookings(response.data),
            error: e => this.setError(e),
          }),
          // 👇 Handle potential error within inner pipe.
          catchError(() => EMPTY)
        )
      )
    );
  });
}
