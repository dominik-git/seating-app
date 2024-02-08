import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BookingViewModel } from '../../../../api-generated/models/booking-view-model';
import { CheckboxComponent } from '../../../shared/components/form/check-box/check-box.component';
import { DatePipe, NgForOf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-booking-section',
  standalone: true,
  imports: [CheckboxComponent, DatePipe, NgForOf, MatButtonModule],
  templateUrl: './booking-section.component.html',
  styleUrl: './booking-section.component.scss',
})
export class BookingSectionComponent {
  @Input() sectionTitle: string;
  @Input() bookings: BookingViewModel[]; // Adjust the type based on your data model
  @Output() releaseActionTriggered = new EventEmitter<any>();

  selectedBookings: { [bookingId: number]: boolean } = {};

  toggleSelection(bookingId: number, isSelected: boolean) {
    this.selectedBookings[bookingId] = isSelected;
  }

  releaseSelected() {
    console.log(this.selectedBookings);
    this.releaseActionTriggered.emit(this.selectedBookings);
  }
}
