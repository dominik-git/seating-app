import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  exhaustMap,
  map,
  mergeMap, tap,
  withLatestFrom,
} from 'rxjs/operators';
import {
  BookingAction,
  CloseBookDeskModal, LOAD_SEATS_IN_DATE_RANGE_SUCCESSFUL,
  LoadSeatsInDateRangeSuccessful,
  OPEN_BOOK_DESK_MODAL,
  SELECT_SEAT_DATE_RANGE,
} from '@actions/booking/booking.action';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { SeatBookDialog } from '../../modules/seating/modals/seat-book-dialog';
import { select, Store } from '@ngrx/store';
import * as fromRoot from '@store/reducers';
import { LOAD_DESKS_SUCCESSFUL } from '@actions/app/app.action';
import { EMPTY } from 'rxjs';
import { BookingResourceService } from '../../services/booking/booking-resource.service';

@Injectable()
export class BookingEffects {
  constructor(
    private readonly _store: Store<fromRoot.State>,
    private actions$: Actions <BookingAction>,
    public dialog: MatDialog,
    private bookingResourceService: BookingResourceService
  ) {}

  openDialog = createEffect(() => {
    return this.actions$.pipe(
      ofType(OPEN_BOOK_DESK_MODAL),
      withLatestFrom(
        this._store.pipe(select(fromRoot.getSelectedDate)),
        this._store.pipe(select(fromRoot.getSelectedDesk))
      ),
      exhaustMap(([action, date, selectedDesk]) => {
        console.log(action, "selected date", date)
        let dialogRef = this.dialog.open(SeatBookDialog, {
          data: {
            selectedDate: date,
            selectedDesk,
          },
        });

        return dialogRef.afterClosed();
      }),
      map((result: any) => {
        console.log(result);
        // if (result === undefined) {
        //   return LoginDialogActions.closed();
        // }
        return CloseBookDeskModal();
      })
    );
  });

  // closeDialog = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(CLOSE_BOOK_DESK_MODAL),
  //     withLatestFrom(
  //       this._store.pipe(select(fromRoot.getSelectedDate)),
  //       this._store.pipe(select(fromRoot.getSelectedDesk)),
  //     ),
  //     exhaustMap(([action, date, selectedDesk])=> {
  //       let dialogRef = this.dialog.open(AssignFixedPlaceDialog, {
  //         data: {
  //           selectedDate: date,
  //           selectedDesk
  //         },
  //       });
  //
  //       return dialogRef.afterClosed();
  //     }),
  //     map((result: any) => {
  //       // if (result === undefined) {
  //       //   return LoginDialogActions.closed();
  //       // }
  //       return CloseBookDeskModal();
  //     })
  //   );
  // });

  // loadDeskInWeek = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(SELECT_SEAT_DATE_RANGE),
  //     withLatestFrom(this._store.pipe(select(fromRoot.getSelectedDesk))),
  //     mergeMap(([action, seatId]) => {
  //        return  this.bookingResourceService.getDesksInDateRange(action.payload, seatId).pipe(
  //          tap(data =>{
  //            console.log(data)
  //          }),
  //           map((movies) => ({
  //             type: LOAD_SEATS_IN_DATE_RANGE_SUCCESSFUL,
  //             payload: movies,
  //           })),
  //           catchError(() => EMPTY)
  //         )
  //     }
  //     )
  //   );
  // });

  // });
}
