import {createAction, props, union} from '@ngrx/store';
import {BookDeskDay, BookParkingPlaceDay, SeatsInRange} from "../../../models/booking.model";
import {ElementRef} from "@angular/core";
import {BookedItemModel} from "../../../models/booked-item.model";

export const BOOK_DESK = '[booking] book desk';
export const OPEN_BOOK_DESK_MODAL = '[booking] open book desk modal';

export const BOOK_DESK_PLACE = '[booking] book desk place';
export const BOOK_DESK_SUCCESSFULLY = '[booking] book desk successfully';
export const BOOK_DESK_FAILED = '[booking] book desk failed';

export const REMOVE_BOOK_DESK = '[booking] remove book desk';
export const REMOVE_BOOK_DESK_SUCCESSFULLY = '[booking] remove book desk successfully';
export const REMOVE_BOOK_DESK_FAILED = '[booking] remove book desk failed';

export const BOOK_PARKING_PLACE = '[booking] book parking place';
export const BOOK_PARKING_PLACE_SUCCESSFULLY = '[booking] book parking place successfully';
export const BOOK_PARKING_PLACE_FAILED = '[booking] book parking place failed';

export const REMOVE_PARKING_PLACE= '[booking] remove parking place';
export const REMOVE_PARKING_PLACE_SUCCESSFULLY = '[booking] remove parking place successfully';
export const REMOVE_PARKING_PLACE_FAILED = '[booking] remove parking place failed';

export const SELECT_SEAT_DATE_RANGE = '[booking] select seat date range';
export const LOAD_SEATS_IN_DATE_RANGE_SUCCESSFUL = '[booking] load seats in date range successful';
export const LOAD_SEATS_IN_DATE_RANGE_FAILED = '[booking] load seats in date range failed';
export const SELECT_SEAT_DAYS = '[booking] select seat days';

export const LOAD_RESERVED_PLACES_IN_DATE_RANGE = '[booking] load reserved places in date range successful';
export const LOAD_RESERVED_PLACES_IN_DATE_RANGE_SUCCESSFUL = '[booking] load reserved places in date range successful';
export const LOAD_RESERVED_PLACES_IN_DATE_RANGE_FAILED = '[booking] load reserved places in date range failed';





export const BookDesk = createAction(
  BOOK_DESK,
  props<{ payload: BookDeskDay[] }>()
);

export const OpenBookDeskModal = createAction(
  OPEN_BOOK_DESK_MODAL,
  props<{ payload: number }>()
);

export const BookDeskPlace = createAction(
  BOOK_DESK_PLACE,
  props<{ payload: {dates: Date[], deskId: number} }>()
);

export const CloseBookDeskModal = createAction(
  BOOK_DESK_PLACE,
);

export const BookParkingPlace = createAction(
  BOOK_PARKING_PLACE,
  props<{ payload: BookParkingPlaceDay[] }>()
);

export const SelectDateRange = createAction(
  SELECT_SEAT_DATE_RANGE,
  props<{ payload: Date }>()
);

export const LoadSeatsInDateRangeSuccessful = createAction(
  LOAD_SEATS_IN_DATE_RANGE_SUCCESSFUL,
  props<{ payload: SeatsInRange[] }>()
);


export const SelectSeatDays = createAction(
  SELECT_SEAT_DAYS,
  props<{ payload:{dates: Date[], deskId: number} }>()
);

export const LoadReservedPlacesInDateRange = createAction(
  LOAD_RESERVED_PLACES_IN_DATE_RANGE,
  props<{ payload: Date }>()
);

export const LoadReservedPlacesInDateRangeSuccessful = createAction(
  LOAD_RESERVED_PLACES_IN_DATE_RANGE_SUCCESSFUL,
  props<{ payload: BookedItemModel[]  }>()
);



const all = union({
  SelectDateRange,
  BookParkingPlace,
  BookDeskPlace,
  LoadSeatsInDateRangeSuccessful,
  SelectSeatDays,
  OpenBookDeskModal,
  CloseBookDeskModal,
  BookDesk
})

export type BookingAction = typeof all;




