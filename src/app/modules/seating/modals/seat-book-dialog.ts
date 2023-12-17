import { Component, Inject, OnInit } from '@angular/core';
import { BookingResourceService } from '../../../services/booking/booking-resource.service';
import { SeatsInRange } from '../../../models/booking.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'dialog-content-example-dialog',
  styleUrls: ['seat-book-dialog.css'],
  templateUrl: 'seat-book-dialog.html',
})
export class SeatBookDialog implements OnInit {
  seatsInWeek: SeatsInRange[];
  bookedDays: Date[] = [];
  loading = false;

  constructor(
    public dialogRef: MatDialogRef<SeatBookDialog>,
    @Inject(MAT_DIALOG_DATA)
    public data: { selectedDate: Date; selectedDesk: string },
    private bookingResourceService: BookingResourceService
  ) {}

  ngOnInit() {
    this.loading = true;
    this.bookingResourceService
      .getDesksInDateRange(this.data.selectedDate, this.data.selectedDesk)
      .subscribe((response) => {
        this.loading = false;
        this.seatsInWeek = response as SeatsInRange[];
      });
  }

  closeDialog() {
    this.dialogRef.close({ days: this.bookedDays });
  }

  onSelectDateRangeOutput(daysInWeek: Date[]) {
    this.loading = true;
    this.bookingResourceService
      .getDesksInDateRange(daysInWeek[0], this.data.selectedDesk)
      .subscribe((response) => {
        this.loading = false;
        this.seatsInWeek = response as SeatsInRange[];
      });
  }

  onDaySelect(date: Date) {
    this.bookedDays.push(date);
  }

  onDayUnSelect(date: Date) {
    this.bookedDays = this.bookedDays.filter(
      (dayItem) => dayItem.getDate() !== date.getDate()
    );
  }

  isDaySelected(day: Date) {
    const foundDate = this.bookedDays.find((date) => {
      return date.getTime() == day.getTime();
    });
    return !!foundDate;
  }
}
