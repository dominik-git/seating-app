import { Actions, createEffect, ofType } from '@ngrx/effects';
import {catchError, exhaustMap, map, mergeMap, tap, withLatestFrom} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
  CHANGE_PLACE,
  LOAD_FIXED_PLACES,
  LOAD_FIXED_PLACES_SUCCESSFUL,
  OPEN_ASSIGN_PLACE_MODAL
} from '@actions/admin/admin.actions';
import { select, Store } from '@ngrx/store';
import * as fromRoot from '@store/reducers';

import { BookingResourceService } from '../../services/booking/booking-resource.service';
import {LOAD_DESKS_SUCCESSFUL} from "@actions/app/app.action";
import {EMPTY} from "rxjs";
import {CloseBookDeskModal, OPEN_BOOK_DESK_MODAL} from "@actions/booking/booking.action";
import {SeatBookDialog} from "../../modules/seating/modals/seat-book-dialog";

@Injectable()
export class AdminEffect {
  constructor(
    private actions$: Actions,
    private readonly _store: Store<fromRoot.State>,
    private bookingResourceService: BookingResourceService
  ) {}

  loadFixedPlaces = createEffect(() => {
    return this.actions$.pipe(
      ofType(LOAD_FIXED_PLACES,CHANGE_PLACE),
      withLatestFrom(this._store.pipe(select(fromRoot.getSelectedPlace))),
      exhaustMap(([action, state]) => {
        return this.bookingResourceService.getFixedPlaces(state).pipe(
          tap((places)=>console.log(places)),
          map((places) => ({
            type: LOAD_FIXED_PLACES_SUCCESSFUL,
            payload: places,
          })),
          catchError(() => EMPTY)
        );
      }),
    );
  });

  // openDialog = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(OPEN_ASSIGN_PLACE_MODAL),
  //     withLatestFrom(
  //       this._store.pipe(select(fromRoot.getSelectedDate)),
  //       this._store.pipe(select(fromRoot.getSelectedDesk))
  //     ),
  //     exhaustMap(([action, date, selectedDesk]) => {
  //       console.log(action, "selected date", date)
  //       let dialogRef = this.dialog.open(SeatBookDialog, {
  //         data: {
  //           selectedDate: date,
  //           selectedDesk,
  //         },
  //       });
  //
  //       return dialogRef.afterClosed();
  //     }),
  //     map((result: any) => {
  //       console.log(result);
  //       // if (result === undefined) {
  //       //   return LoginDialogActions.closed();
  //       // }
  //       return CloseBookDeskModal();
  //     })
  //   );
  // });

}
