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
import { BookingDay } from './seat-book-dialog';
import { BookingStateEnum } from '../../../api-generated/models/booking-state-enum';

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
  constructor(private bookingService: BookingService) {
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
    (state, bookings: BookingViewModel[]) => {
      const updatedDays = this.createBookingDays(
        state.selectedWeek,
        bookings,
        state.bookedDays
      );
      return {
        ...state,
        bookings,
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
              response => this.setBookingsAndUpdateDays(response.data.bookings),
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
    bookedDays: Date[]
  ): BookingDay[] {
    return selectedWeek.map(date => {
      const bookingForDay = bookings.filter(
        booking =>
          new Date(booking.bookingDate).toDateString() === date.toDateString()
      );
      return {
        date: date,
        bookings: bookingForDay,
        bookedByCurrentUser: false, // Logic to determine this
        isSelected: bookedDays.some(
          bookedDate => bookedDate.toDateString() === date.toDateString()
        ),
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
}
