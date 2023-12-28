import { createReducer, on } from '@ngrx/store';
import * as BookingActions from '@actions/booking/booking.action';
import {
  BookDeskDay,
  BookParkingPlaceDay, SeatsInRange,
} from '../../../models/booking.model';
import {LoadSeatsInDateRangeSuccessful} from "@actions/booking/booking.action";


export interface State {
  bookedDesks: BookDeskDay[];
  bookedParkingPlace: BookParkingPlaceDay[];
  selectedDesk: any;
  seatsInDateRange: SeatsInRange[];
  selectedSeatDays: Date[];
}

export const initialState: State = {
  bookedDesks: [],
  bookedParkingPlace: [],
  selectedDesk: null,
  seatsInDateRange: [],
  selectedSeatDays: [],
};

export const reducer = createReducer(
  initialState,
  on(BookingActions.BookParkingPlace, (state, { payload }) => ({
    ...state,
    selectedState: payload,
  })),
  on(BookingActions.OpenBookDeskModal, (state, { payload }) => ({
    ...state,
    selectedDesk: payload,
  })),
  on(BookingActions.LoadSeatsInDateRangeSuccessful, (state, { payload }) => ({
    ...state,
    seatsInDateRange: payload,
  })),
  on(BookingActions.SelectSeatDays, (state, { payload }) => ({
    ...state,
    selectedSeatDays: payload.dates,
  }))

);

export const bookedDesksState = (state: State) => state.bookedDesks;
export const bookedParkingPlaceState = (state: State) => state.bookedParkingPlace;
export const selectedDeskState = (state: State) => state.selectedDesk;
