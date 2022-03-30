import * as fromApp from './app/app.reducer';
import * as fromLoading from './loading/loading.reducer';
import * as fromBooking from './booking/booking.reducer';
import * as fromAdmin from './admin/admin.reducer';
import { ActionReducerMap, createSelector } from '@ngrx/store';
import {selectFixedPlaces} from "./admin/admin.reducer";


export interface State {
  app: fromApp.State;
  loading: fromLoading.State;
  booking: fromBooking.State;
  admin: fromAdmin.State
}

export const rootReducer: ActionReducerMap<State> = {
  app: fromApp.reducer,
  loading: fromLoading.reducer,
  booking: fromBooking.reducer,
  admin: fromAdmin.reducer
};

/*
 *  MAIN STATES
 */
export const getAppState = (state: State) => state.app;
export const getLoadingState = (state: State) => state.loading;
export const getBookingState = (state: State) => state.booking;
export const getAdminState = (state: State) => state.admin;

/*
 *  APPLICATION
 */
export const getState            = createSelector(getAppState, fromApp.selectState);
export const getFloor            = createSelector(getAppState, fromApp.selectFloor);
export const getParkingPlace     = createSelector(getAppState, fromApp.selectParkingPlace);
export const getDeskPlace        = createSelector(getAppState, fromApp.selectDeskPlace);
export const getLanguage         = createSelector(getAppState, fromApp.selectLanguage);
export const getSelectedDate     = createSelector(getAppState, fromApp.selectDate);
export const getLoadedDesks      = createSelector(getAppState, fromApp.selectDesks);

/*
 *  LOADING
 */
export const getSpinner            = createSelector(getLoadingState, fromLoading.selectLoadingState);

/*
 *  BOOKING
 */

export const getSelectedDesk        = createSelector(getBookingState, fromBooking.selectedDeskState);

/*
 *  ADMIN
 */

export const getSelectedPlace        = createSelector(getAdminState, fromAdmin.selectSelectedPlace);
export const getFixedPlaces          = createSelector(getAdminState, fromAdmin.selectFixedPlaces);


