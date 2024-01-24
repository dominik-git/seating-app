import { Component, Input } from '@angular/core';
import { UserViewModel } from '../../../../api-generated/models/user-view-model';
import { DatePipe, JsonPipe, NgForOf, NgIf } from '@angular/common';
import { BookingViewModel } from '../../../../api-generated/models/booking-view-model';

@Component({
  selector: 'app-seat-tooltip',
  templateUrl: './seat-tooltip.component.html',
  styleUrls: ['./seat-tooltip.component.scss'],
  standalone: true,
  imports: [JsonPipe, DatePipe, NgIf, NgForOf],
})
export class SeatTooltipComponent {
  @Input() display: string = 'none';
  @Input() left: number = 0;
  @Input() top: number = 0;
  person: UserViewModel = null;
  bookings: BookingViewModel[];

  showTooltip(x: number, y: number, person: any): void {
    this.left = x;
    this.top = y;
    this.person = person;
    this.display = 'block';
  }

  showBookingTooltip(x: number, y: number, bookings: BookingViewModel[]): void {
    this.left = x;
    this.top = y;
    this.bookings = bookings;
    this.display = 'block';
  }

  hideTooltip(): void {
    this.display = 'none';
  }
}
