import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { NgForOf } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MultipleDatePickerComponent } from '../../../shared/components/form/multiple-date-picker/multiple-date-picker.component';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { BookingPlaceWithBookingsViewModel } from '../../../../api-generated/models/booking-place-with-bookings-view-model';
import { BookingReleasePlaceRequest } from '../../../../api-generated/models/booking-release-place-request';
import { NgxMultipleDatesModule } from 'ngx-multiple-dates';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-release-window',
  standalone: true,
  imports: [
    MatInputModule,
    NgForOf,
    MatChipsModule,

    MatIconModule,
    MultipleDatePickerComponent,
    MatButtonModule,
    MatDatepickerModule,
    NgxMultipleDatesModule,
    ReactiveFormsModule,
  ],
  providers: [MatDatepickerModule, MatNativeDateModule],
  templateUrl: './release-modal.component.html',
  styleUrl: './release-modal.component.scss',
})
export class ReleaseModalComponent {
  public reactiveControl = new FormControl<Date[]>([], Validators.required);

  constructor(
    public dialogRef: MatDialogRef<ReleaseModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BookingPlaceWithBookingsViewModel
  ) {}

  save() {
    // Ensure dates are formatted as ISO strings
    const releaseDates =
      this.reactiveControl.value?.map(date => date.toISOString()) || [];

    // Construct the request object
    const request: BookingReleasePlaceRequest = {
      bookingPlaceId: this.data.id, // Assuming 'id' exists on your data model
      releaseDates: releaseDates,
    };
    this.dialogRef.close(request);
  }

  closeModal() {
    this.dialogRef.close();
  }
}
