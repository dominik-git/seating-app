import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import {
  CHANGE_BOOK_DATE,
  CHANGE_STATE,
  LOAD_DESKS,
  LOAD_DESKS_SUCCESSFUL,
} from '@actions/app/app.action';
import {  map  } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { HIDE_SPINNER, SHOW_SPINNER } from '@actions/loading/loading.action';
import {LOAD_SEATS_IN_DATE_RANGE_SUCCESSFUL, SELECT_SEAT_DATE_RANGE} from "@actions/booking/booking.action";
import {
  CHANGE_PLACE,
  LOAD_FIXED_PLACES,
  LOAD_FIXED_PLACES_FAILED,
  LOAD_FIXED_PLACES_SUCCESSFUL
} from "@actions/admin/admin.actions";

const showSpinnerActions = [LOAD_DESKS, CHANGE_STATE, CHANGE_BOOK_DATE,SELECT_SEAT_DATE_RANGE,LOAD_FIXED_PLACES,CHANGE_PLACE];

const hideSpinnerActions = [LOAD_DESKS_SUCCESSFUL,LOAD_SEATS_IN_DATE_RANGE_SUCCESSFUL,LOAD_FIXED_PLACES_SUCCESSFUL,LOAD_FIXED_PLACES_FAILED];

@Injectable()
export class LoadingEffects {
  constructor(private actions$: Actions) {}

  hideLoader$ = createEffect(() =>
    this.actions$.pipe(
      ofType(...hideSpinnerActions),
      map(() => ({
        type: HIDE_SPINNER,
      }))
    )
  );

  showLoader$ = createEffect(() =>
    this.actions$.pipe(
      ofType(...showSpinnerActions),
      map(() => ({
        type: SHOW_SPINNER,
      }))
    )
  );
}
