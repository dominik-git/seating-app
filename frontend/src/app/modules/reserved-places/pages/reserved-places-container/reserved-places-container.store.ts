import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { MatDialog } from '@angular/material/dialog';
import { EMPTY, Observable } from 'rxjs';
import {
  catchError,
  finalize,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { BookingService } from '../../../../api-generated/services/booking.service';
import { UserBookingsViewModel } from '../../../../api-generated/models/user-bookings-view-model';
import { UserBookingViewModel } from '../../../../api-generated/models/user-booking-view-model';
import { BookingPlaceWithBookingsViewModel } from '../../../../api-generated/models/booking-place-with-bookings-view-model';
import { BookingViewModel } from '../../../../api-generated/models/booking-view-model';
import { BookingStateEnum } from '../../../../api-generated/models/booking-state-enum';
import { BookingTypeEnum } from '../../../shared/enums/bookingType.enum';
import { ReleaseModalComponent } from '../../modals/free-fixed-place-modal/release-modal.component';
import { ToastrService } from 'ngx-toastr';

export interface ReservedPlacesState {
  fixedPlaces: BookingPlaceWithBookingsViewModel[];
  fixedParkings: BookingPlaceWithBookingsViewModel[];
  releasedFixedParking: BookingViewModel[];
  releasedFixedFloorPlaces: BookingViewModel[];
  floorPlaces: UserBookingViewModel[];
  carPlaces: UserBookingViewModel[];
  selectedMonth: number;
  error: any;
  isLoading: boolean;
}

@Injectable()
export class ReservedPlacesStore extends ComponentStore<ReservedPlacesState> {
  constructor(
    private readonly bookingService: BookingService,
    public dialog: MatDialog,
    private readonly toastr: ToastrService
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
      selectedMonth: 0,
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
    isLoading: false,
  }));

  readonly setSelectedMonth = this.updater<number>((state, selectedMonth) => ({
    ...state,
    selectedMonth,
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

  readonly getBookings = this.effect((trigger$: Observable<void>) =>
    trigger$.pipe(
      withLatestFrom(this.select(state => state.selectedMonth)),
      tap(() => this.setLoading(true)),
      switchMap(([_, selectedMonth]) => {
        if (!selectedMonth) return EMPTY; // Handle null case appropriately

        return this.bookingService
          .apiBookingGetAllByUserIdGet$Json({
            month: selectedMonth,
          })
          .pipe(
            tapResponse(
              response => this.setBookings(response.data),
              error => this.setError(error.toString())
            ),
            finalize(() => this.setLoading(false)),
            catchError(() => EMPTY)
          );
      })
    )
  );

  readonly deleteBooking = this.effect<{
    bookingId: number;
    bookingType: BookingTypeEnum;
  }>(params$ =>
    params$.pipe(
      tap(() => this.setLoading(true)),
      switchMap(({ bookingId, bookingType }) =>
        this.bookingService.apiBookingIdDelete$Plain({ id: bookingId }).pipe(
          tap({
            next: () => {
              // On success, determine the booking type and call the respective updater
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

              this.toastr.success(
                `Successfully deleted booking with ID: ${bookingId}`
              );
            },
            error: error => {
              // Handle error scenario
              console.error('Error deleting booking:', error);

              this.toastr.error('Error deleting booking:', error);
              this.setError(error.toString());
              // Optionally, add additional error handling logic here
            },
          }),
          finalize(() => this.setLoading(false))
        )
      ),
      catchError(error => {
        // This catchError is for handling errors that may occur in switchMap before the HTTP call
        console.error('Error in deleteBooking effect:', error);
        this.setError(error.toString());
        return EMPTY;
      })
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
