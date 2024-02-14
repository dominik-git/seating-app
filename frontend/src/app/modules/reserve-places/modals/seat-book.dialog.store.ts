import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { EMPTY, Observable } from 'rxjs';
import {
  catchError,
  delay,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { BookingService } from '../../../api-generated/services/booking.service';
import { BookingViewModel } from '../../../api-generated/models/booking-view-model';
import { BookingDay, SeatBookDialog } from './seat-book-dialog';
import { BookingStateEnum } from '../../../api-generated/models/booking-state-enum';
import { MatDialogRef } from '@angular/material/dialog';
import { BookingPlaceTypeEnum } from '../../../api-generated/models/booking-place-type-enum';
import { BookingPlaceWithBookingsViewModel } from '../../../api-generated/models/booking-place-with-bookings-view-model';
import { startOfDay } from 'date-fns';

export interface SeatBookingState {
  selectedWeek: Date[];
  bookings: BookingViewModel[];
  loading: boolean;
  selectedPlaceId: number;
  selectedDate: Date;
  days: BookingDay[];
  bookedDays: BookingDay[]; // Array to keep track of selected days
  type: BookingPlaceTypeEnum;
}

@Injectable()
export class SeatBookingStore extends ComponentStore<SeatBookingState> {
  constructor(
    private bookingService: BookingService,
    private dialogRef: MatDialogRef<SeatBookDialog>
  ) {
    super({
      selectedWeek: [],
      bookings: [],
      loading: false,
      selectedPlaceId: null,
      selectedDate: new Date(),
      days: [],
      bookedDays: [],
      type: null,
    });
  }

  readonly selectSelectedDate$ = this.select(state => state.selectedDate);
  readonly selectType$ = this.select(state => state.type);
  readonly selectSelectedPlaceId$ = this.select(state => state.selectedPlaceId);

  readonly selectDays$ = this.select(state => state.days);
  readonly selectedBookedDays$ = this.select(state => state.bookedDays);

  readonly setWeekDays = this.updater((state, selectedWeek: Date[]) => ({
    ...state,
    selectedWeek,
    loading: true,
  }));

  // Updater to set bookings and update days based on bookedDays
  readonly setBookingsAndUpdateDays = this.updater(
    (state, response: BookingPlaceWithBookingsViewModel) => {
      const updatedDays = this.createBookingDays(
        state.selectedWeek,
        response.bookings,
        state.bookedDays,
        response.type
      );
      return {
        ...state,
        bookings: response.bookings,
        days: updatedDays,
        loading: false,
        type: response.type,
      };
    }
  );

  readonly setLoading = this.updater((state, loading: boolean) => ({
    ...state,
    loading,
  }));

  readonly setSelectedId = this.updater((state, loading: boolean) => ({
    ...state,
    loading,
  }));

  readonly setParams = this.updater(
    (
      state,
      data: {
        selectedPlaceId: number;
        selectedDate: Date;
      }
    ) => ({
      ...state,
      selectedPlaceId: data.selectedPlaceId,
      selectedDate: data.selectedDate,
    })
  );

  readonly selectDay = this.updater((state, dayToSelect: BookingDay) => {
    // Check if the day is already in the bookedDays array
    const isAlreadySelected = state.bookedDays.some(
      day => day.date.toDateString() === dayToSelect.date.toDateString()
    );

    if (!isAlreadySelected) {
      // Add the day to bookedDays if it's not already selected
      return {
        ...state,
        bookedDays: [...state.bookedDays, { ...dayToSelect, isSelected: true }],
      };
    }

    return state; // Return current state if the day is already selected
  });

  // Method to unselect a day
  readonly unselectDay = this.updater((state, dayToUnselect: BookingDay) => {
    // Remove the day from bookedDays if it's currently selected
    const updatedBookedDays = state.bookedDays.filter(
      day => day.date.toDateString() !== dayToUnselect.date.toDateString()
    );

    return {
      ...state,
      bookedDays: updatedBookedDays,
    };
  });

  // Effects

  // Effect to handle the creation or update of bookings
  readonly createOrUpdateBookings = this.effect<void>(
    (request$: Observable<void>) =>
      request$.pipe(
        tap(() => this.setLoading(true)),
        withLatestFrom(
          this.selectedBookedDays$,
          this.selectSelectedPlaceId$,
          this.selectType$
        ),
        switchMap(([_, bookedDays, placeId, type]) => {
          const bookings = this.mapBookingRequest(bookedDays, placeId, type);

          return this.bookingService
            .apiBookingCreateOrUpdateBookingsPut$Json({
              body: {
                bookings: bookings,
              },
            })
            .pipe(
              tapResponse(
                () => {
                  // Handle successful booking update
                  this.setLoading(false);
                  this.dialogRef.close(true);
                  // Additional actions if required
                },
                error => {
                  // Handle error
                  console.error('Error updating bookings:', error);
                  this.setLoading(false);
                }
              ),
              catchError(() => {
                this.setLoading(false);
                return EMPTY;
              })
            );
        })
      )
  );

  readonly changeWeek = this.effect<Date[]>((weekDays$: Observable<Date[]>) =>
    weekDays$.pipe(
      tap(selectedWeek => this.setWeekDays(selectedWeek)),
      switchMap(selectedWeek => {
        const bookingPlaceId = this.get().selectedPlaceId;
        const startDate = selectedWeek[0].toISOString();
        const endDate = selectedWeek[selectedWeek.length - 1].toISOString();
        return this.bookingService
          .apiBookingGetByBookingPlaceIdWithDateRangeGet$Json({
            BookingPlaceId: bookingPlaceId,
            DateFrom: startDate,
            DateTo: endDate,
          })
          .pipe(
            delay(300),
            tapResponse(
              response => {
                this.setBookingsAndUpdateDays(response.data);
              },
              error => {
                console.error('Error fetching bookings:', error);
                this.setLoading(false);
              }
            ),
            catchError(() => EMPTY)
          );
      })
    )
  );

  // Additional methods

  // Method to create booking days
  private createBookingDays(
    selectedWeek: Date[],
    bookings: BookingViewModel[],
    bookedDays: BookingDay[],
    type: BookingPlaceTypeEnum
  ): BookingDay[] {
    return selectedWeek.map(date => {
      // Filter bookings for the current day.
      const bookingForDay = bookings.filter(
        booking =>
          new Date(booking.bookingDate).toDateString() === date.toDateString()
      );

      // Initially, set the day as not disabled.
      let isDisabled = this.isWeekend(date); // Disable the day if it's a weekend.

      if (!isDisabled) {
        // Only proceed with further checks if it's not a weekend.
        if (type === BookingPlaceTypeEnum.$0) {
          // For fixed places, the day is disabled if there are no available bookings.
          isDisabled = !bookingForDay.some(
            booking => booking.state === BookingStateEnum.$0
          );
        } else if (type === BookingPlaceTypeEnum.$1) {
          // For hybrid places, the day is disabled if there is at least one confirmed booking.
          isDisabled = bookingForDay.some(
            booking => booking.state === BookingStateEnum.$1
          );
        }
      }

      // Determine if the day is selected by checking against the bookedDays array.
      const isSelected = bookedDays.some(
        bookedDate => bookedDate.date.toDateString() === date.toDateString()
      );

      return {
        date,
        bookings: bookingForDay,
        bookedByCurrentUser: false, // You'll need to implement logic to determine this.
        isDisabled,
        isSelected,
      };
    });
  }

  private mapBookingRequest(
    bookedDays: BookingDay[],
    selectedPlaceId: number,
    type: BookingPlaceTypeEnum
  ): BookingViewModel[] {
    let request;
    if (type === BookingPlaceTypeEnum.$0) {
      request = bookedDays.map(day => {
        return {
          bookingId: day.bookings[0].bookingId,
          bookingPlaceId: selectedPlaceId,
          state: BookingPlaceTypeEnum.$1,
          bookingDate: startOfDay(day.date).toISOString(),
        };
      });
    } else {
      request = bookedDays.map(day => {
        return {
          bookingDate: startOfDay(day.date).toISOString(),
          bookingPlaceId: selectedPlaceId,
          state: BookingStateEnum.$1,
        };
      });
    }

    return request;
  }

  private isWeekend(day: Date): boolean {
    return day.getDay() == 6 || day.getDay() == 0;
  }
}
