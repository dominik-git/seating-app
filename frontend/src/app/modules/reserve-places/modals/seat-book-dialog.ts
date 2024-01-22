import { Component, Inject, OnInit } from '@angular/core';
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
import { NgFor, NgIf } from '@angular/common';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { eachDayOfInterval, endOfWeek, startOfWeek } from 'date-fns';
import { BookingViewModel } from '../../../api-generated/models/booking-view-model';
import { BookingService } from '../../../api-generated/services/booking.service';

export interface BookingDay {
  date: Date;
  bookings?: BookingViewModel[];
  bookedByCurrentUser: boolean;
  isSelected: boolean;
}

@Component({
  selector: 'dialog-content-example-dialog',
  styleUrls: ['seat-book-dialog.css'],
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
  ],
})
export class SeatBookDialog implements OnInit {
  weekDays: Date[];
  bookings: BookingViewModel[] = [];
  loading = false;
  days: BookingDay[];

  constructor(
    public dialogRef: MatDialogRef<SeatBookDialog>,
    @Inject(MAT_DIALOG_DATA)
    public data: { selectedDate: Date; placeId: number },
    private bookingService: BookingService
  ) {}

  ngOnInit() {
    this.loading = true;
    const startDate = startOfWeek(this.data.selectedDate, { weekStartsOn: 1 });
    const endDate = endOfWeek(this.data.selectedDate, { weekStartsOn: 1 });
    this.weekDays = eachDayOfInterval({ start: startDate, end: endDate });
    this.days = [
      {
        date: this.weekDays[0],
        bookedByCurrentUser: false,
        isSelected: false,
      },
      {
        date: this.weekDays[1],
        bookedByCurrentUser: false,
        isSelected: false,
      },
      {
        date: this.weekDays[2],
        bookedByCurrentUser: false,
        isSelected: false,
      },
      {
        date: this.weekDays[3],
        bookedByCurrentUser: false,
        isSelected: false,
      },
      {
        date: this.weekDays[4],
        bookedByCurrentUser: false,
        isSelected: false,
      },
      {
        date: this.weekDays[5],
        bookedByCurrentUser: false,
        isSelected: false,
      },
      {
        date: this.weekDays[6],
        bookedByCurrentUser: false,
        isSelected: false,
      },
    ];

    this.days = this.days.map(day => ({
      ...day,
      bookings: this.findBookingsForDate(day.date),
    }));

    this.loading = false;
    // this.bookingService
    //   .apiBookingGetByBookingPlaceIdWithDateRangeGet$Json({
    //     BookingPlaceId: this.data.placeId,
    //     DateFrom: startDate.toUTCString(),
    //     DateTo: endDate.toUTCString(),
    //   })
    //   .subscribe(response => {
    //     // this.loading = false;
    //     // this.bookings = response.bookings;
    //     console.log(response.data);
    //   });

    // this.loading = true;
    // this.bookingService
    //   .apiBookingGetByBookingPlaceIdWithDateRangeGet$Json(this.data.selectedDate, this.data.selectedDesk)
    //   .subscribe(response => {
    //     this.loading = false;
    //     this.seatsInWeek = response as SeatsInRange[];
    //   });
  }

  closeDialog() {
    // this.dialogRef.close({ days: this.bookedDays });
  }

  onSelectDateRangeOutput(daysInWeek: Date[]) {
    // this.loading = true;
    // this.bookingService
    //   .apiBookingGetByBookingPlaceIdWithDateRangeGet$Json(daysInWeek[0], this.data.selectedDesk)
    //   .subscribe(response => {
    //     this.loading = false;
    //     this.seatsInWeek = response as SeatsInRange[];
    //   });
  }

  findBookingsForDate(date) {
    // Logic to find bookings for a given date
    // For example, filter from a bookings array
    return this.bookings.filter(booking => booking.bookingDate === date);
  }

  onDaySelect(date: Date) {
    // this.bookedDays.push(date);
  }

  onDayUnSelect(date: Date) {
    // this.bookedDays = this.bookedDays.filter(
    //   dayItem => dayItem.getDate() !== date.getDate()
    // );
  }

  isDaySelected(day: Date) {
    // const foundDate = this.bookedDays.find(date => {
    //   return date.getTime() == day.getTime();
    // });
    // return !!foundDate;
  }
}
