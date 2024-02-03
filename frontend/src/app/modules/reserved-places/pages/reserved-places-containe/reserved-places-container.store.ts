import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { MatDialog } from '@angular/material/dialog';
import { EMPTY, Observable } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { BookingService } from '../../../../api-generated/services/booking.service';
import { UserBookingsViewModel } from '../../../../api-generated/models/user-bookings-view-model';
import { UserBookingViewModel } from '../../../../api-generated/models/user-booking-view-model';
import { BookingPlaceWithBookingsViewModel } from '../../../../api-generated/models/booking-place-with-bookings-view-model';
import { ReleaseModalComponent } from '../../modals/release-modal/release-modal.component';

export interface ReservedPlacesState {
  fixedPlaces: BookingPlaceWithBookingsViewModel[];
  fixedParkings: BookingPlaceWithBookingsViewModel[];
  floorPlaces: UserBookingViewModel[];
  carPlaces: UserBookingViewModel[];
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
      fixedPlaces: null,
      fixedParkings: null,
      floorPlaces: null,
      carPlaces: null,
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

  readonly openReleaseModal = this.effect<BookingPlaceWithBookingsViewModel>(
    place$ =>
      place$.pipe(
        tap(place => {
          const dialogRef = this.dialog.open(ReleaseModalComponent, {
            data: place,
            width: '500px',
          });
          dialogRef.afterClosed().subscribe(result => {
            if (result) {
              this.bookingService
                .apiBookingReleaseFixedPlacePut$Json({
                  body: result,
                })
                .subscribe(data => {
                  console.log(data);
                });
            }
          });
          // Optionally, handle modal close result if needed apiBookingReleaseFixedPlacePut$Json
        })
      )
  );
}
