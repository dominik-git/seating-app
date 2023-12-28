import {createAction, props, Action, union} from '@ngrx/store';
import { StateEnum } from '../../../enums/state.enum';
import {OPEN_BOOK_DESK_MODAL} from "@actions/booking/booking.action";

export const CHANGE_PLACE = '[admin] change place';
export const LOAD_FIXED_PLACES = '[admin] load fixed places';
export const LOAD_FIXED_PLACES_SUCCESSFUL = '[app] load fixed places successfully';
export const LOAD_FIXED_PLACES_FAILED = '[app] load fixed places failed';

export const OPEN_ASSIGN_PLACE_MODAL = '[app] open assign place modal';
export const CLOSE_ASSIGN_PLACE_MODAL = '[app] close assign place modal';


export const ChangePlace = createAction(
  CHANGE_PLACE,
  props<{ payload: StateEnum }>()
);


export const LoadFixedPlaces = createAction(
  LOAD_FIXED_PLACES,
);

export const LoadFixedPlacesSuccessfully = createAction(
  LOAD_FIXED_PLACES_SUCCESSFUL,
  props<{ payload: [] }>()
);

export const LoadFixedPlacesFailed = createAction(
  LOAD_FIXED_PLACES_FAILED,
);



export const OpenAssignPlaceModal = createAction(
  OPEN_ASSIGN_PLACE_MODAL,
  props<{ payload: {svgElement:any} }>()
);

const all = union({
  ChangePlace,
  LoadFixedPlaces,
  LoadFixedPlacesSuccessfully,
  LoadFixedPlacesFailed
})

export type AdminActions = typeof all;
