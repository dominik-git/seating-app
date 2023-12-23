import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import {
  CHANGE_BOOK_DATE,
  CHANGE_STATE,
  LOAD_DESKS,
  LOAD_DESKS_SUCCESSFUL,
} from '@actions/app/app.action';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { select, Store } from '@ngrx/store';
import * as fromRoot from '@store/reducers';
import { BookingResourceService } from '../../api/booking/booking-resource.service';

@Injectable()
export class AppEffects {
  constructor(
    private actions$: Actions,
    private bookingResourceService: BookingResourceService,
    private readonly _store: Store<fromRoot.State>
  ) {}

  specialEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CHANGE_STATE, CHANGE_BOOK_DATE, LOAD_DESKS),
      withLatestFrom(
        this._store.pipe(select(fromRoot.getSelectedDate)),
        this._store.pipe(select(fromRoot.getState))
      ),
      mergeMap(([action, date, state]) =>
        this.bookingResourceService.getDesks(date, state).pipe(
          map((movies) => ({
            type: LOAD_DESKS_SUCCESSFUL,
            payload: movies,
          })),
          catchError(() => EMPTY)
        )
      )
    )
  );
}
