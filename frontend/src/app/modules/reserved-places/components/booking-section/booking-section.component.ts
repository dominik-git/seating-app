import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BookingViewModel } from '../../../../api-generated/models/booking-view-model';
import { CheckboxComponent } from '../../../shared/components/form/check-box/check-box.component';
import { DatePipe, NgForOf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-booking-section',
  standalone: true,
  imports: [
    CheckboxComponent,
    DatePipe,
    NgForOf,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './booking-section.component.html',
  styleUrl: './booking-section.component.scss',
})
export class BookingSectionComponent {
  @Input() sectionTitle: string;
  @Input() bookings: BookingViewModel[]; // Adjust the type based on your data model
  @Output() bookingDeleted = new EventEmitter<number>();

  selectedBookings: { [bookingId: number]: boolean } = {};

  deleteBooking(bookingId: number) {
    this.bookingDeleted.emit(bookingId);
  }
}
