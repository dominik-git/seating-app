import { createAction, props, Action } from '@ngrx/store';
import { StateEnum } from '../../../enums/state.enum';
import {DeskModel} from "../../../models/desk.model";

export const CHANGE_LANGUAGE = '[app] change language';
export const CHANGE_ROUTE = '[app] change route';
export const CHANGE_STATE = '[app] change state';
export const CHANGE_DESK_PLACE = '[app] change desk place';
export const CHANGE_PARK_PLACE = '[app] change park place';
export const CHANGE_BOOK_DATE = '[app] change book date';
export const LOAD_DESKS = '[app] load desks';

export const LOAD_DESKS_SUCCESSFUL = '[app] load desks successfully';


export const ChangeLanguage = createAction(
  CHANGE_LANGUAGE,
  props<{ payload: string }>()
);

export const ChangeRoute = createAction(
  CHANGE_ROUTE,
  props<{ payload: string }>()
);

export const ChangeState = createAction(
  CHANGE_STATE,
  props<{ payload: StateEnum }>()
);

export const ChangeDeskPlace = createAction(
  CHANGE_DESK_PLACE,
  props<{ payload: string }>()
);

export const ChangeParkPlace = createAction(
  CHANGE_PARK_PLACE,
  props<{ payload: string }>()
);

export const ChangeBookDate = createAction(
  CHANGE_BOOK_DATE,
  props<{ payload: Date }>()
);

export const LoadDesk = createAction(
  LOAD_DESKS,
);

export const LoadDeskSuccessful = createAction(
  LOAD_DESKS_SUCCESSFUL,
  props<{ payload: DeskModel[] }>()
);



