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

export interface SeatBookingState {
  selectedWeek: Date[];
  bookings: BookingViewModel[];
  loading: boolean;
  selectedPlaceId: number;
  selectedDate: Date;
  days: BookingDay[];
  bookedDays: Date[]; // Array to keep track of selected days
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
      bookedDays: [], // Initialize the bookedDays array
    });
  }

  readonly selectSelectedDate$ = this.select(state => state.selectedDate);
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

  readonly selectDay = this.updater((state, date: Date) => ({
    ...state,
    days: state.days.map(day => ({
      ...day,
      isSelected:
        day.date.toDateString() === date.toDateString()
          ? !day.isSelected
          : day.isSelected,
    })),
  }));

  // Updater to toggle day selection
  readonly toggleDaySelection = this.updater((state, date: Date) => {
    const isDateSelected = state.bookedDays.some(
      d => d.toDateString() === date.toDateString()
    );
    const updatedBookedDays = isDateSelected
      ? state.bookedDays.filter(d => d.toDateString() !== date.toDateString())
      : [...state.bookedDays, date];

    return {
      ...state,
      bookedDays: updatedBookedDays,
      days: state.days.map(day => ({
        ...day,
        isSelected: updatedBookedDays.some(
          d => d.toDateString() === day.date.toDateString()
        ),
      })),
    };
  });

  // Effects

  // Effect to handle the creation or update of bookings
  readonly createOrUpdateBookings = this.effect<void>(
    (request$: Observable<void>) =>
      request$.pipe(
        tap(() => this.setLoading(true)),
        withLatestFrom(this.selectedBookedDays$, this.selectSelectedPlaceId$),
        switchMap(([_, bookedDays, placeId]) => {
          const bookings = this.mapBookingRequest(bookedDays, placeId);

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
    bookedDays: Date[],
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
        bookedDate => bookedDate.toDateString() === date.toDateString()
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
    bookedDays: Date[],
    selectedPlaceId: number
  ): BookingViewModel[] {
    const request = bookedDays.map(day => {
      return {
        bookingDate: day.toISOString(),
        bookingPlaceId: selectedPlaceId,
        state: BookingStateEnum.$1,
      };
    });
    return request;
  }

  private isWeekend(day: Date): boolean {
    return day.getDay() == 6 || day.getDay() == 0;
  }
}
