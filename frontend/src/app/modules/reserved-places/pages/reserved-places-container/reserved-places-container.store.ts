import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { MatDialog } from '@angular/material/dialog';
import { EMPTY, Observable } from 'rxjs';
import { catchError, finalize, switchMap, tap } from 'rxjs/operators';
import { BookingService } from '../../../../api-generated/services/booking.service';
import { UserBookingsViewModel } from '../../../../api-generated/models/user-bookings-view-model';
import { UserBookingViewModel } from '../../../../api-generated/models/user-booking-view-model';
import { BookingPlaceWithBookingsViewModel } from '../../../../api-generated/models/booking-place-with-bookings-view-model';
import { ReleaseModalComponent } from '../../modals/release-modal/release-modal.component';
import { BookingViewModel } from '../../../../api-generated/models/booking-view-model';
import { BookingStateEnum } from '../../../../api-generated/models/booking-state-enum';
import { BookingTypeEnum } from '../../../shared/enums/bookingType.enum';

export interface ReservedPlacesState {
  fixedPlaces: BookingPlaceWithBookingsViewModel[];
  fixedParkings: BookingPlaceWithBookingsViewModel[];
  releasedFixedParking: BookingViewModel[];
  releasedFixedFloorPlaces: BookingViewModel[];
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
      fixedPlaces: [],
      releasedFixedFloorPlaces: [],
      fixedParkings: [],
      releasedFixedParking: [],
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

  readonly selectReleasedFixedFloorPlaces$ = this.select(
    state => state.releasedFixedFloorPlaces
  );
  readonly selectReleasedFixedParking$ = this.select(
    state => state.releasedFixedParking
  );
  readonly error$: Observable<string | null> = this.select(
    state => state.error
  );

  // UPDATERS
  readonly setBookings = this.updater(
    (state, bookings: UserBookingsViewModel) => {
      return {
        ...state,
        fixedPlaces: bookings.fixedPlacesVm,
        fixedParkings: bookings.fixedParkingsVm,
        floorPlaces: bookings.bookingsVm.filter(
          floorBooking => floorBooking.state === BookingStateEnum.$1
        ),
        releasedFixedFloorPlaces: bookings.bookingsVm.filter(
          floorBooking => floorBooking.state === BookingStateEnum.$0
        ),
        carPlaces: bookings.parkingsVm.filter(
          parkingBooking => parkingBooking.state === BookingStateEnum.$1
        ),
        releasedFixedParking: bookings.parkingsVm.filter(
          parkingBooking => parkingBooking.state === BookingStateEnum.$0
        ),
        isLoading: false,
      };
    }
  );

  readonly setLoading = this.updater((state, isLoading: boolean) => ({
    ...state,
    isLoading,
  }));

  readonly setError = this.updater((state, error: string | null) => ({
    ...state,
    error,
  }));

  readonly removeFloorPlaceBooking = this.updater<number>(
    (state, bookingId) => ({
      ...state,
      floorPlaces: state.floorPlaces.filter(
        booking => booking.bookingId !== bookingId
      ),
    })
  );

  readonly removeReleasedFixedFloorPlaceBooking = this.updater<number>(
    (state, bookingId) => ({
      ...state,
      releasedFixedFloorPlaces: state.releasedFixedFloorPlaces.filter(
        booking => booking.bookingId !== bookingId
      ),
    })
  );

  readonly removeCarPlaceBooking = this.updater<number>((state, bookingId) => ({
    ...state,
    carPlaces: state.carPlaces.filter(
      booking => booking.bookingId !== bookingId
    ),
  }));

  readonly removeReleasedFixedParkingBooking = this.updater<number>(
    (state, bookingId) => ({
      ...state,
      releasedFixedParking: state.releasedFixedParking.filter(
        booking => booking.bookingId !== bookingId
      ),
    })
  );

  // EFFECTS
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

  readonly deleteBooking = this.effect<{
    bookingId: number;
    bookingType: BookingTypeEnum;
  }>(params$ =>
    params$.pipe(
      tap(() => this.setLoading(true)),
      switchMap(({ bookingId, bookingType }) =>
        this.bookingService
          .apiBookingBookingPlaceIdDelete$Plain({ id: bookingId })
          .pipe(
            tap(() => {
              // Determine the booking type and call the respective updater
              switch (bookingType) {
                case BookingTypeEnum.FloorPlace:
                  this.removeFloorPlaceBooking(bookingId);
                  break;
                case BookingTypeEnum.ReleasedFixedFloorPlace:
                  this.removeReleasedFixedFloorPlaceBooking(bookingId);
                  break;
                case BookingTypeEnum.CarPlace:
                  this.removeCarPlaceBooking(bookingId);
                  break;
                case BookingTypeEnum.ReleasedFixedParking:
                  this.removeReleasedFixedParkingBooking(bookingId);
                  break;
              }
            }),
            catchError(error => {
              console.error('Error deleting booking:', error);
              this.setError(error.toString());
              return EMPTY;
            }),
            finalize(() => this.setLoading(false))
          )
      )
    )
  );

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
                  this.getBookings();
                });
            }
          });
          // Optionally, handle modal close result if needed apiBookingReleaseFixedPlacePut$Json
        })
      )
  );
}
