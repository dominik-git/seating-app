import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { SpaceBookTimeSlotComponent } from '../components/space-book-time-slot/space-book-time-slot.component';
import { WeekPickerComponent } from '../../shared/components/week-picker/week-picker.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { BookingViewModel } from '../../../api-generated/models/booking-view-model';
import { SeatBookingStore } from './seat-book.dialog.store';
import { Observable } from 'rxjs';
import { BookingPlaceTypeEnum } from '../../../api-generated/models/booking-place-type-enum';

export interface BookingDay {
  date: Date;
  bookings?: BookingViewModel[];
  bookedByCurrentUser?: boolean;
  isSelected?: boolean;
  isDisabled?: boolean;
  type?: BookingPlaceTypeEnum;
}

@Component({
  selector: 'dialog-content-example-dialog',
  styleUrls: ['seat-book-dialog.scss'],
  templateUrl: 'seat-book-dialog.html',
  standalone: true,
  imports: [
    NgIf,
    MatProgressSpinnerModule,
    MatDialogContent,
    WeekPickerComponent,
    NgFor,
    SpaceBookTimeSlotComponent,
    MatDialogActions,
    MatButtonModule,
    MatDialogClose,
    NgxSkeletonLoaderModule,
    AsyncPipe,
  ],
  providers: [SeatBookingStore],
})
export class SeatBookDialog {
  days$ = this.seatBookingStore.selectDays$;
  loading$: Observable<boolean>;

  constructor(
    public dialogRef: MatDialogRef<SeatBookDialog>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      selectedDate: Date;
      placeId: number;
    },
    private seatBookingStore: SeatBookingStore
  ) {
    this.seatBookingStore.setParams({
      selectedDate: this.data.selectedDate,
      selectedPlaceId: this.data.placeId,
    });
    this.loading$ = seatBookingStore.select(state => state.loading);
  }

  cancelDialog() {
    this.dialogRef.close(false);
  }

  closeDialog() {
    this.seatBookingStore.createOrUpdateBookings();
    // this.dialogRef.close();
  }

  onSelectDateRangeOutput(daysInWeek: Date[]) {
    this.seatBookingStore.changeWeek(daysInWeek);
  }

  onDaySelect(day: BookingDay) {
    this.seatBookingStore.selectDay(day);
  }

  onDayUnSelect(day: BookingDay) {
    this.seatBookingStore.unselectDay(day);
  }

  trackByDay(index: number, day: BookingDay): any {
    // Create a unique identifier based on the date and isSelected state
    return `${day.date.getTime()}_${day.isSelected}`;
  }
}
